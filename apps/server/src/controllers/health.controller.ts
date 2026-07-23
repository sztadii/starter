import type { AppContext } from '@/env'
import AIProvider from '@/providers/ai'
import DbProvider from '@/providers/db'

export class HealthController {
  private readonly context: AppContext

  constructor(context: AppContext) {
    this.context = context
  }

  async health() {
    const { env } = this.context
    const [isDbOk, isAiOk] = await Promise.all([this.checkDb(), this.checkAi()])

    return this.context.json({
      serverDate: new Date().toISOString(),
      isDbOk,
      isAiOk,
      env: {
        JWT_SECRET: this.previewEnvVariable(env.JWT_SECRET),
        EMAIL_FROM: this.previewEnvVariable(env.EMAIL_FROM),
        AI_MODEL: this.previewEnvVariable(env.AI_MODEL),
      },
    })
  }

  private async checkDb() {
    try {
      const db = new DbProvider(this.context.env.DB)
      const user = await db.first<{ id: string }>(
        'SELECT id FROM users LIMIT 1',
      )
      return user !== null
    } catch {
      return false
    }
  }

  private async checkAi() {
    try {
      const model = this.context.env.AI_MODEL
      if (!model) return false
      const ai = new AIProvider(this.context.env.AI, model)
      const answer = await ai.generateText({
        prompt: 'What is 2+2 equal to? Reply with only the number.',
      })
      return answer.includes('4')
    } catch {
      return false
    }
  }

  private previewEnvVariable(value: string | undefined) {
    if (value === undefined) return null
    return value.slice(-2)
  }
}
