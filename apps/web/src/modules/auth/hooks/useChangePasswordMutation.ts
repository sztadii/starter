import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'

type ChangePasswordInput = {
  currentPassword: string
  password: string
}

export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: (input: ChangePasswordInput) => api.changePassword(input),
  })
}
