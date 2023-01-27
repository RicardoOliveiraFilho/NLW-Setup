import { Alert, ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { HabitsEmpty } from "../components/HabitsEmpty";
import clsx from "clsx";

interface Params {
  date: string
}

interface DayInfoData {
  completedHabits: string[]
  possibleHabits: Array<{
    id: string
    title: string
  }>
}

export function Habit() {
  const [loading, setLoading] = useState(true)
  const [dayInfo, setDayInfo] = useState<DayInfoData | null>(null)

  const route = useRoute()
  const { date } = route.params as Params

  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')
  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  const amountAccomplishedPercentage = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(
        dayInfo.possibleHabits.length,
        dayInfo.completedHabits.length
      )
    : 0

  async function fetchHabits() {
    try {
      setLoading(true)

      const response = await api.get("/day", { params: { date } })
      setDayInfo(response.data)
    } catch (error) {
      console.log(error)
      Alert.alert("Ops", "Não foi possível carregar os hábitos do dia selecionado!")
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleHabit(habitId: string) {
    try {
      await api.patch(`habits/${habitId}/toggle`)

      const isHabitAlreadyCompleted = dayInfo!.completedHabits.includes(habitId)
      let completedHabits: string[] = []

      if (isHabitAlreadyCompleted) {
        completedHabits = dayInfo!.completedHabits.filter(id => id !== habitId)
      } else {
        completedHabits = [...dayInfo!.completedHabits, habitId]
      }

      setDayInfo({
        possibleHabits: dayInfo!.possibleHabits,
        completedHabits,
      })
    } catch (error) {
      console.log(error)
      Alert.alert("Ops", "Não foi possível alterar a situação do hábito selecionado!")
    }
  }

  useEffect(() => {
    fetchHabits()
  }, [])

  if (loading) {
    return (<Loading />)
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={amountAccomplishedPercentage} />

        <View className={clsx("mt-6", {
          "opacity-50": isDateInPast
        })}>
          {
            dayInfo?.possibleHabits.length
              ? dayInfo?.possibleHabits.map(habit =>
                <Checkbox key={habit.id}
                  title={habit.title}
                  checked={dayInfo.completedHabits.includes(habit.id)}
                  onPress={() => handleToggleHabit(habit.id)}
                  disabled={isDateInPast}
                />
              )
              : <HabitsEmpty isDateInPast={isDateInPast} />
          }
        </View>

        {
          isDateInPast && dayInfo?.possibleHabits.length ? (
            <Text className="text-white mt-10 text-center">
              Você não pode alterar a situação de um hábito que esteja em um dia passado!
            </Text>
          ) : null
        }
      </ScrollView>
    </View>
  )
}
