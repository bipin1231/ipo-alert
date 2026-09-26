import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fetchCurrentIPOs } from './cdsc.js'
import { sendTelegramMessage } from './telegram.js'
const DATA_FILE = 'data/ipos.json'

const currentIPOs = await fetchCurrentIPOs()

console.log(`Found ${currentIPOs.length} current IPOs`)

const previousIPOs = existsSync(DATA_FILE)
  ? JSON.parse(readFileSync(DATA_FILE, 'utf8'))
  : []

const previousCompanies = new Set(
  previousIPOs.map((ipo: { companyName: string }) => ipo.companyName),
)

const newIPOs = currentIPOs.filter(
  ipo => !previousCompanies.has(ipo.companyName),
)

console.log(`New IPOs: ${newIPOs.length}`)

for (const ipo of newIPOs) {
  const message = formatNewIPO(ipo)

  console.log(message)

  if (process.env.SEND_TELEGRAM === 'true') {
    await sendTelegramMessage(message)
  }
}

writeFileSync(
  DATA_FILE,
  JSON.stringify(currentIPOs, null, 2) + '\n',
)
function formatNewIPO(ipo: {
  companyName: string
  issueManager: string
  issuedUnit: string
  openDate: string
  closeDate: string
}) {
  return `
🚨 <b>NEW IPO ALERT</b>

🏢 <b>${ipo.companyName}</b>

📅 Open: ${ipo.openDate}
📅 Close: ${ipo.closeDate}

📦 Issued Units: ${ipo.issuedUnit}
🏦 Issue Manager: ${ipo.issueManager}

🇳🇵 Nepal IPO Alert
`.trim()
}