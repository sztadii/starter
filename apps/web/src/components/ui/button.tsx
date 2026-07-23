import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  cn(
    'inline-flex cursor-pointer items-center justify-center gap-2',
    'rounded-lg text-sm font-semibold transition-colors select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45',
    'disabled:pointer-events-none disabled:opacity-50',
  ),
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline:
          'border border-border bg-card/80 hover:border-accent/50 hover:bg-card',
        ghost: 'hover:bg-card/70',
      },
      size: {
        default: 'h-11 min-w-28 px-4 py-2',
        lg: 'h-12 min-w-36 px-6',
        sm: 'h-9 min-w-0 px-3 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
  }

export function Button({
  className,
  variant,
  size,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading ? '…' : null}
      {children}
    </button>
  )
}
