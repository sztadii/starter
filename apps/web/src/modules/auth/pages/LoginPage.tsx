import { type FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getToken, setToken } from '@/lib/api'
import { cn } from '@/lib/utils'
import { useLoginMutation } from '@/modules/auth/hooks/useLoginMutation'

export function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [checking, setChecking] = useState(true)
  const loginMutation = useLoginMutation()

  useEffect(() => {
    if (getToken()) {
      navigate('/dashboard', { replace: true })
      return
    }
    setChecking(false)
  }, [navigate])

  if (checking) {
    return null
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    loginMutation.mutate(
      { username, password },
      {
        onSuccess({ token }) {
          setToken(token)
          navigate('/dashboard', { replace: true })
        },
        onError(err) {
          setError(err.message || 'Login failed')
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
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-sm text-muted">Use your username and password.</p>
      </div>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" loading={loginMutation.isPending}>
          Sign in
        </Button>
      </form>
      <p className="text-sm text-muted">
        New here?{' '}
        <Link
          to="/register"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </main>
  )
}
