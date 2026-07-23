import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getToken } from '@/lib/api'
import { useMeQuery } from '@/modules/auth/hooks/useMeQuery'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const hasToken = Boolean(getToken())
  const meQuery = useMeQuery()

  useEffect(() => {
    if (!hasToken) {
      navigate('/login', { replace: true })
    }
  }, [hasToken, navigate])

  if (!hasToken || meQuery.isPending || meQuery.isError || !meQuery.data) {
    return null
  }

  return children
}
