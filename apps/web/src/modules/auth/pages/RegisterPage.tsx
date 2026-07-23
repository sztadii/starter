import { type FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getToken, setToken } from '@/lib/api'
import { cn } from '@/lib/utils'
import { useRegisterMutation } from '@/modules/auth/hooks/useRegisterMutation'

export function RegisterPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [checking, setChecking] = useState(true)
  const registerMutation = useRegisterMutation()

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
    registerMutation.mutate(
      { username, password },
      {
        onSuccess({ token }) {
          setToken(token)
          navigate('/dashboard', { replace: true })
        },
        onError(err) {
          setError(err.message || 'Registration failed')
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
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="text-sm text-muted">
          Password must be at least 5 characters.
        </p>
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={5}
          />
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" loading={registerMutation.isPending}>
          Register
        </Button>
      </form>
      <p className="text-sm text-muted">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </main>
  )
}
