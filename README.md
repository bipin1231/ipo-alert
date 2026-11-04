# Nepal IPO Alert

Monitors [CDSC](https://cdsc.com.np/index.php/ipolist) for newly listed Nepal IPOs and posts alerts to a Telegram group.

**Join the alert group:** [t.me/+DXkmJFGx-uczZTQ9](https://t.me/+DXkmJFGx-uczZTQ9)

## How it works

1. Fetches the current IPO list from CDSC
2. Compares it against the last known state in `data/ipos.json`
3. Sends a Telegram message for each newly appeared company
4. Saves the latest list so the next run only alerts on real changes

A GitHub Action runs this check daily (03:00 UTC) and can also be triggered manually.

## Requirements

- Node.js 22+
- [pnpm](https://pnpm.io/)
- Telegram bot token and chat ID (for sending alerts)

## Setup

```bash
pnpm install
```

Create a `.env` (or export) with:

```bash
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
SEND_TELEGRAM=true
```

Without `SEND_TELEGRAM=true`, the script still detects new IPOs and updates local state, but does not post to Telegram.

## Scripts

| Command       | Description                          |
| ------------- | ------------------------------------ |
| `pnpm dev`    | Run once with `tsx`                  |
| `pnpm build`  | Compile TypeScript to `dist/`        |
| `pnpm start`  | Run the compiled `dist/index.js`     |

## GitHub Actions secrets

For the scheduled workflow (`.github/workflows/ipo-alert.yml`), set:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

The workflow commits updates to `data/ipos.json` when the IPO list changes.

## Project layout

```
src/
  index.ts      # compare state, format & send alerts
  cdsc.ts       # scrape CDSC IPO table
  telegram.ts   # Telegram Bot API helper
data/
  ipos.json     # last known IPO list
index.html      # project landing page
```

## Landing page

Open [`index.html`](./index.html) in a browser for a short public description of the project and a join link to the Telegram group.
