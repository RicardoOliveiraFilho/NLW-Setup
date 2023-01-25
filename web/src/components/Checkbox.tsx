import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

interface CheckboxProps {
  title: string
  styleTitle: string
  checked?: boolean
  onCheckedChange?: () => void
}

export function Checkbox({ title, styleTitle, checked, onCheckedChange }: CheckboxProps) {
  return (
    <CheckboxRadix.Root
      className="flex items-center gap-3 group"
      checked={checked}
      onCheckedChange={onCheckedChange}
    >
      <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
        <CheckboxRadix.Indicator>
          <Check size={20} className="text-white" weight="bold" />
        </CheckboxRadix.Indicator>
      </div>

      <span className={styleTitle}>
        {title}
      </span>
    </CheckboxRadix.Root>
  )
}
