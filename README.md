## M-Tap activation experience

A responsive Next.js App Router experience for M-Tap tag activation.
The activation flow uses the hosted M-Tap switching backend through server-side
Next.js API proxy routes.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

- `/` — M-Tap product landing page.
- `/activate` — guided test-tag activation flow. It uses `04A38CF2196880` unless a `uid` query parameter supplies another 14-character hexadecimal UID.

The activation flow calls `/api/v1/tags/initiate-pairing` and
`/api/v1/tags/verify-otp`. Requesting a code sends a real SMS through the
backend. Set `MTAP_API_BASE_URL` to override the default hosted backend URL.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```
