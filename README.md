This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Authentication is owned by `remote-cooperative-backend`. Set
`NEXT_PUBLIC_API_URL` to its exact origin before building. Browser requests call
`/auth/*` and `/admin/auth/*` on that API with credentials included. The API
sets HttpOnly cookies; this repository contains no auth API handlers or secrets.

After sign-in, pending members complete `/onboarding`, active members proceed to
`/dashboard`, and suspended members see support information. These pages load
identity from the backend before rendering account content, including direct
visits. Redirects are browser navigation; API authorization stays in the backend.
`POST /auth/accept-terms` records the accepted terms version and timestamp.

Run the frontend on port 3001 (`pnpm dev --port 3001`). Configure that exact
origin in the backend's `APP_ORIGIN` and `CORS_ORIGINS`. Register the backend's
`/auth/google/callback` URL in Google Console and `GOOGLE_REDIRECT_URI`.
Production should use same-site frontend and API domains with HTTPS and
`COOKIE_SAME_SITE=lax`. Cross-site hosting needs `COOKIE_SAME_SITE=none` and
browsers that allow third-party cookies. Existing frontend-host cookies are no
longer used; users need to sign in again after this migration.

The displayed information is the existing pilot membership/privacy information,
not published full policies. Replace it with the approved policies before
financial services launch. The current terms version comes from the backend's
`currentTermsVersion`; update it alongside policy changes in both repositories.
Financial-service eligibility remains separate from membership onboarding.

Loan terms are maintained in `src/components/loan-terms.tsx`, shared by the
frontend `/loan-terms` page and the loan application form. No backend terms URL
is required. The application uses the backend policy for pricing, repayment
limits and the current loan terms version, and submits consent and that version
for recording. Update the displayed terms and backend `LOAN_TERMS_VERSION`
together when loan terms change.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
