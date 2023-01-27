import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

interface HabitsEmptyProps {
  isDateInPast: boolean
}

export function HabitsEmpty({ isDateInPast }: HabitsEmptyProps) {
  const { navigate } = useNavigation()

  return (
    <Text className="text-zinc-400 text-base">
      {
        isDateInPast
          ? 'Você não cadastrou nenhum hábito para monitorar neste dia!'
          : 'Você ainda não está monitorando nenhum hábito neste dia! '
      }

      {!isDateInPast && <Text
        className="text-violet-400 text-base underline active:text-violet-500"
        onPress={() => navigate('new')}
      >
        Comece cadastrando um por aqui!
      </Text>}
    </Text>
  )
}