import { useQuery } from '@tanstack/react-query'
import { api, getToken } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'

export function useMeQuery() {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: () => api.me(),
    enabled: Boolean(getToken()),
  })
}
