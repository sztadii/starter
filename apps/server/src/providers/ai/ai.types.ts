export type AIGenerateInput = {
  prompt: string
  model?: string
}

export type AIProvider = {
  generateText(input: AIGenerateInput): Promise<string>
}
