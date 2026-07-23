import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'

type RegisterInput = {
  username: string
  password: string
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (input: RegisterInput) => api.register(input),
  })
}
