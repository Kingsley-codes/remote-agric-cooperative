# Frontend security setup

The frontend runs on port 3001 and the NestJS API runs on port 3000. Copy
`.env.example` to `.env.local`. Set `NEXT_PUBLIC_API_URL` to the real HTTPS API
URL before building for production; public variables must never contain secrets.
The backend's `CORS_ORIGINS` must include this frontend's exact origin.

`next.config.ts` now sends CSP, anti-framing, MIME-sniffing, referrer, and browser
permissions headers, removes `X-Powered-By`, and enables HSTS in production.
The CSP restricts network connections to this site and the configured API, and
allows the existing Google Maps iframe. It does not enable cross-origin cookies.
The configuration does not connect login forms or other UI to the API.

## Work required before authenticated financial screens

- The current static/partially prerendered setup needs inline hydration scripts.
  Its CSP permits `unsafe-inline` scripts and styles, so it does not block all
  inline XSS. Before introducing sensitive screens, use dynamically rendered
  authenticated routes and a fresh per-request nonce. Next.js documents the
  rendering tradeoff: https://nextjs.org/docs/app/guides/content-security-policy.
  Do not apply nonce headers to cached HTML with mismatched/nonexistent nonces.
- Keep untrusted content in React text nodes. Avoid `dangerouslySetInnerHTML`,
  `innerHTML`, and unvalidated navigation URLs. If rich HTML becomes a requirement,
  use a maintained HTML sanitizer with an explicit allowlist at that boundary.
- Integrate verified Remote Agric authentication. Do not store long-lived tokens
  in browser storage. If sessions use cookies, use Secure, HttpOnly, appropriate
  SameSite settings, and server-verified CSRF tokens on state-changing requests.
- Authenticated member/admin pages must enforce server-side authorization and
  prevent shared caching of personal data. Frontend visibility is not access control.
- Payment redirects are display/navigation events, never proof of payment.
- Extend the CSP narrowly when the selected identity/payment provider requires
  an external frame or redirect; do not add wildcard hosts to make errors disappear.

Deploy behind HTTPS with current dependencies. Run dependency audits regularly.
