import { Eye, EyeOff } from 'lucide-react'
import { type InputHTMLAttributes, useState } from 'react'
import { cn } from '@/lib/utils'

const inputClassName = cn(
  'flex h-11 w-full rounded-lg border border-border bg-card/80',
  'px-3 py-2 text-sm outline-none transition-shadow',
  'placeholder:text-muted focus-visible:ring-2 focus-visible:ring-accent/35',
)

export function Input({
  className,
  type,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false)

  if (type !== 'password') {
    return (
      <input type={type} className={cn(inputClassName, className)} {...props} />
    )
  }

  return (
    <div className="relative">
      <input
        type={visible ? 'text' : 'password'}
        className={cn(inputClassName, 'pr-10', className)}
        {...props}
      />
      <button
        type="button"
        className={cn(
          'absolute inset-y-0 right-0 flex w-10 items-center justify-center',
          'text-muted transition-colors hover:text-foreground',
          'focus-visible:outline-none focus-visible:text-foreground',
        )}
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        tabIndex={-1}
      >
        {visible ? (
          <EyeOff className="size-4" aria-hidden />
        ) : (
          <Eye className="size-4" aria-hidden />
        )}
      </button>
    </div>
  )
}
