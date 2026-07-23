import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'

type LoginInput = {
  username: string
  password: string
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: ({ username, password }: LoginInput) =>
      api.login(username, password),
  })
}
