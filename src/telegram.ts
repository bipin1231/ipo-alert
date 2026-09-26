const TELEGRAM_API = 'https://api.telegram.org'

export async function sendTelegramMessage(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN is missing')
  }

  if (!chatId) {
    throw new Error('TELEGRAM_CHAT_ID is missing')
  }

  const response = await fetch(
    `${TELEGRAM_API}/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    },
  )

  if (!response.ok) {
    const body = await response.text()

    throw new Error(
      `Telegram request failed: ${response.status} ${body}`,
    )
  }
}