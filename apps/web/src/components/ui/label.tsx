import type { LabelHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Label({
  className,
  htmlFor,
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'text-xs font-semibold tracking-wide text-muted',
        className,
      )}
      {...props}
    >
      {children}
    </label>
  )
}
