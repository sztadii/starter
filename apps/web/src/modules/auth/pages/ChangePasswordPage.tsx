import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { queryClient } from '@/lib/queryClient'
import { queryKeys } from '@/lib/queryKeys'
import { cn } from '@/lib/utils'
import { useChangePasswordMutation } from '@/modules/auth/hooks/useChangePasswordMutation'

export function ChangePasswordPage() {
  const navigate = useNavigate()
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const changePasswordMutation = useChangePasswordMutation()

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    changePasswordMutation.mutate(
      { currentPassword, password },
      {
        async onSuccess() {
          await queryClient.invalidateQueries({ queryKey: queryKeys.me })
          navigate('/dashboard', { replace: true })
        },
        onError(err) {
          setError(err.message || 'Could not change password')
        },
      },
    )
  }

  return (
    <main
      className={cn(
        'mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 px-6',
      )}
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold tracking-wide text-accent">
          Starter
        </p>
        <h1 className="text-2xl font-semibold">Change password</h1>
        <p className="text-sm text-muted">
          Confirm your current password, then set a new one (at least 5
          characters).
        </p>
      </div>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="currentPassword">Current password</Label>
          <Input
            id="currentPassword"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={5}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="confirm">Confirm password</Label>
          <Input
            id="confirm"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={5}
          />
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" loading={changePasswordMutation.isPending}>
          Save password
        </Button>
      </form>
      <p className="text-sm text-muted">
        <Link
          to="/dashboard"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          Back to dashboard
        </Link>
      </p>
    </main>
  )
}
