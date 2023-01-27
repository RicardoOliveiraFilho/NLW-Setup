import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

interface CheckboxProps {
  title: string
  styleTitle: string
  checked?: boolean
  disabled?: boolean
  onCheckedChange?: () => void
}

export function Checkbox({ title, styleTitle, checked, disabled, onCheckedChange }: CheckboxProps) {
  return (
    <CheckboxRadix.Root
      className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
      checked={checked}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
    >
      <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-700 group-data-[state=checked]:group-focus:ring-green-700 group-focus:ring-offset-2 group-focus:ring-offset-background">
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
