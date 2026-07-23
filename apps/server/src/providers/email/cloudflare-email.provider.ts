import type { EmailProvider, SendEmailInput } from './email.types'

export class CloudflareEmailProvider implements EmailProvider {
  constructor(
    private readonly email: SendEmail,
    private readonly from: string,
  ) {}

  async send(input: SendEmailInput): Promise<void> {
    await this.email.send({
      to: input.to,
      from: { email: this.from, name: 'Starter' },
      replyTo: this.from,
      subject: input.subject,
      text: input.text,
      html:
        input.html ??
        `<p>${this.escapeHtml(input.text).replaceAll('\n', '<br>')}</p>`,
    })
  }

  private escapeHtml(value: string) {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
  }
}
