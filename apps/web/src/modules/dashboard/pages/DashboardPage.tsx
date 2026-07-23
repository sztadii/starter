import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { logout } from '@/lib/api'
import { cn } from '@/lib/utils'
import { useMeQuery } from '@/modules/auth/hooks/useMeQuery'

export function DashboardPage() {
  const meQuery = useMeQuery()

  function renderBody() {
    if (meQuery.isPending) {
      return <p className="text-muted">Loading…</p>
    }
    if (meQuery.isError) {
      return (
        <p className="text-destructive">
          {meQuery.error.message || 'Failed to load user'}
        </p>
      )
    }
    if (!meQuery.data) {
      return <p className="text-muted">No user data.</p>
    }
    return (
      <div className="flex flex-col gap-4">
        <p className="text-xl font-semibold">
          Signed in as{' '}
          <span className="text-accent">{meQuery.data.username}</span>
        </p>
        <p className="text-sm text-muted">
          <Link
            to="/change-password"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Change password
          </Link>
        </p>
      </div>
    )
  }

  return (
    <main
      className={cn(
        'mx-auto flex min-h-svh max-w-lg flex-col gap-6 px-6 py-16',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold tracking-wide text-accent">
            Starter
          </p>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
        <Button variant="outline" size="sm" type="button" onClick={logout}>
          Log out
        </Button>
      </div>
      {renderBody()}
    </main>
  )
}

export default DashboardPage
