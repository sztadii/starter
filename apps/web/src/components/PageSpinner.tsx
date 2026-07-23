import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PageSpinner() {
  return (
    <div
      className={cn(
        'mx-auto flex min-h-svh max-w-lg items-center justify-center px-6',
      )}
      role="status"
      aria-label="Loading"
    >
      <Loader2 className="size-8 animate-spin text-accent" />
    </div>
  )
}
