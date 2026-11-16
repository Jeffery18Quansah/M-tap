## M-Tap product simulation

A responsive Next.js App Router experience for exploring the M-Tap contactless payment concept. The site is a front-end simulation: it does not connect to NFC hardware, wallets, SMS services, or payment processors.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

- `/` — M-Tap product landing page.
- `/activate` — guided sample-tag activation flow. An optional `uid` query parameter pre-fills the locked tag ID.

The activation flow uses a deterministic mock service. After requesting a verification code, use the demo code shown on screen (`123456`). No SMS is sent and no real tag or wallet is activated.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```
