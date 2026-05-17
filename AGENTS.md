## Learned User Preferences

- Push GitHub changes to the `catalyixacademia-hash/ENT-Dr-Koirala` repository on the `catalyixacademia-hash` account.
- When the Nepali language toggle is on, every visible string on the public site and admin must be Nepali with no English text remaining.
- Admin list/table action buttons must be visible by default without requiring hover to reveal them.
- On the desktop admin dashboard, give analytics roughly 60% width and appointments roughly 40% so patient names stay readable.
- After feature or UI work, expect requests to commit, push to GitHub, and confirm Vercel deploys successfully.

## Learned Workspace Facts

- The Next.js 15 app lives in `entportal/`; the Git repo root is `entportal-rocket` with an npm workspace (`package.json` at root runs `npm run build -w entportal`).
- GitHub remote: `https://github.com/catalyixacademia-hash/ENT-Dr-Koirala.git` on branch `main`.
- Production deploys via Vercel linked to that GitHub repo; set env vars from `entportal/.env` in Vercel (`.env` is gitignored).
- Local dev runs on port 4028 (`npm run dev` in `entportal` or via the root workspace script).
- Backend and admin auth use Supabase; booking confirmation emails use Resend (`RESEND_API_KEY`, lazy-init in `send-booking-email` API route).
- Bilingual Nepali/English UI uses shared i18n modules (`i18n.ts`, `i18n-content.ts`, `i18n-extended.ts`, `i18n-helpers.ts`).
