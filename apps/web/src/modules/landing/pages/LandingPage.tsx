import { Link } from 'react-router'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function LandingPage() {
  return (
    <main
      className={cn(
        'relative mx-auto flex min-h-svh max-w-3xl flex-col',
        'justify-center gap-8 px-6 py-16',
      )}
    >
      <p className="font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-foreground md:text-6xl">
        Starter
      </p>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
          Greetings
        </h1>
        <p className="max-w-md text-muted">
          A small playground for Cloudflare and web — open the dashboard to sign
          in.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link to="/dashboard" className={buttonVariants({ size: 'lg' })}>
          Open dashboard
        </Link>
        <Link
          to="/login"
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
        >
          Login
        </Link>
      </div>
    </main>
  )
}
