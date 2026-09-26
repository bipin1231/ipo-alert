import * as cheerio from 'cheerio'

const CDSC_URL = 'https://cdsc.com.np/index.php/ipolist'

export type IPO = {
  companyName: string
  issueManager: string
  issuedUnit: string
  applications: string
  appliedUnit: string
  amount: string
  openDate: string
  closeDate: string
  lastUpdate: string
}

export async function fetchCurrentIPOs(): Promise<IPO[]> {
  const response = await fetch(CDSC_URL)

  if (!response.ok) {
    throw new Error(
      `CDSC request failed: ${response.status} ${response.statusText}`,
    )
  }

  const html = await response.text()
  const $ = cheerio.load(html)

  const ipos: IPO[] = []

  $('table tbody tr').each((_, row) => {
    const cells = $(row)
      .find('td')
      .map((_, cell) => $(cell).text().trim())
      .get()

    if (cells.length < 10) {
      return
    }

    ipos.push({
      companyName: cells[1],
      issueManager: cells[2],
      issuedUnit: cells[3],
      applications: cells[4],
      appliedUnit: cells[5],
      amount: cells[6],
      openDate: cells[7],
      closeDate: cells[8],
      lastUpdate: cells[9],
    })
  })

  return ipos
}