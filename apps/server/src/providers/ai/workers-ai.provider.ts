import type { AIGenerateInput, AIProvider } from './ai.types'

export class WorkersAIProvider implements AIProvider {
  constructor(
    private readonly ai: Ai,
    private readonly model: string,
  ) {}

  async generateText(input: AIGenerateInput): Promise<string> {
    const model = input.model ?? this.model
    const result = await this.ai.run(model as keyof AiModels, {
      messages: [{ role: 'user', content: input.prompt }],
    })

    if (typeof result === 'string') {
      return result
    }

    if (
      result &&
      typeof result === 'object' &&
      'response' in result &&
      typeof result.response === 'string'
    ) {
      return result.response
    }

    return JSON.stringify(result)
  }
}
