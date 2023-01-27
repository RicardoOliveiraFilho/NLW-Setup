import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";
import { Checkbox } from "./Checkbox";

const availableWeekDays = [
  "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
  "Quinta-feira", "Sexta-feira", "Sábado",
]

export function NewHabitForm() {
  const styleTitleCheckbox = "text-white leading-tight"

  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  async function createNewHabit(event: FormEvent) {
    event.preventDefault()
    
    if (!title || weekDays.length === 0) {
      return
    }

    await api.post('habits', {
      title,
      weekDays,
    })

    setTitle('')
    setWeekDays([])

    alert('Hábito criado com sucesso!')
  }

  function handleToggleWeekDay(index: number) {
    if (weekDays.includes(index)) {
      const weekDaysWithRemovedOne = weekDays.filter(day => day !== index)
      setWeekDays(weekDaysWithRemovedOne)
    } else {
      const weekDaysWithAddedOne = [...weekDays, index]
      setWeekDays(weekDaysWithAddedOne)
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={title}
        onChange={event => setTitle(event.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="mt-3 flex flex-col gap-2">
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox
            key={weekDay}
            title={weekDay}
            checked={weekDays.includes(index)}
            styleTitle={styleTitleCheckbox}
            onCheckedChange={() => handleToggleWeekDay(index)}
          />
        ))}
      </div>

      <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 focus:ring-offset-zinc-900">
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}
