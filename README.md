# Opus Bloc onboarding demo

**Live mobile preview:** https://dv64bit.github.io/opusbloc/ (phone mockup on desktop, full-screen on phones). Deployed by `.github/workflows/pages.yml` on every push to `main`; the mockup page lives in `preview/`.

A mobile-first React and Vite implementation of the Opus Bloc account setup, identity verification, account security, and sample investment dashboard experience.

## Run and verify

The Figma Make development server starts automatically. Changes in `src/` hot reload in the preview panel.

```bash
pnpm build
pnpm format --check
```

For this demo:

- Mobile and email OTP: `123456`
- Valid referral codes: `OPUS2025` or `BLOC10`
- Email `existing@opusbloc.demo` simulates an already registered address
- A document filename containing `fail` simulates an interrupted upload
- Verification status controls on the status screen expose pending, verified, action-required, and rejected states

No SMS, email, government verification, OAuth, file transmission, financial transaction, or biometric authentication occurs.

## Sitemap and route structure

The app uses guarded hash routes so it remains deployable as a static Vite application.

```text
#/intro
├── #/phone
│   └── #/phone-otp
├── #/email
│   └── #/email-otp
├── #/account-ready
├── #/referral        (optional)
├── #/biometric
└── main application
    ├── #/home        → "Complete your KYC" banner
    │   └── #/kyc-intro
    │       ├── #/pan
    │       ├── #/upload
    │       ├── #/preview
    │       └── #/processing → back to #/home
    ├── #/market
    │   └── #/property → "Verify to invest" → #/kyc-intro
    ├── #/activity
    ├── #/profile
    └── #/security
```

KYC (PAN) is deliberately not part of onboarding: users explore the app first and start KYC from the home banner or before their first investment. Account setup and identity verification have separate progress models. Routes beyond account creation are guarded by account state; email routes require mobile verification.

## Architecture

- `src/App.tsx`: route orchestration, guarded journey state, screens, and main application views
- `src/components.tsx`: reusable buttons, fields, OTP input, progress, notices, modal sheet, layout, logo, and icon primitives
- `src/services/mockServices.ts`: asynchronous mock adapters and deterministic development failure conditions
- `src/types.ts`: route, KYC, PAN, and application state contracts
- `src/index.css`: design tokens, responsive layouts, interaction states, reduced-motion support, and typography

Only non-sensitive completion flags and statuses are saved in `localStorage`. Phone, email, OTP, PAN data, date of birth, and uploaded files are not persisted. Document object URLs and identity fields remain in memory for the current browser session.

## Production integration points

Replace each method in `src/services/mockServices.ts` with an implementation of the same responsibility:

1. Mobile OTP request and verification
2. Email OTP request and verification
3. Referral validation and QR scanning
4. PAN detail verification
5. Authenticated document upload with progress and retry support
6. KYC submission and status retrieval
7. Google OAuth
8. Passkeys/WebAuthn or platform-native biometric authentication

Production work must also confirm:

- KYC deferral and age eligibility policy
- Approved legal, privacy, retention, and compliance copy
- Country-specific phone validation and supported markets
- Accessible document scanning and upload requirements
- Route protection backed by a server-authenticated session
- Real-time status updates, support contact channels, analytics consent, and error monitoring
- Financial data definitions for estimated, accrued, and paid income

All property, portfolio, income, user, and verification information in this application is illustrative demo data.
