## WhatsApp Helper

WhatsApp Helper is a lightweight web app (PWA-ready) that lets you start a WhatsApp chat with any number—without saving the contact first.

Simply enter the country code, phone number, and an optional message, and the app instantly generates a direct chat link. One tap and you’re inside WhatsApp, ready to send.

### ✨ Features

- Instant chat links with `wa.me` format
- Country code selector (flag + dial code)
- Phone number validation and cleanup (E.164)
- Optional prefilled message support
- Quick actions: Open WhatsApp, Copy link, Share
- Smart paste: auto-splits full numbers like `+62 812-3456-7890`
- Remembers last used data locally (no server)
- Mobile-first design, PWA installable
- Privacy-first: everything runs on your device

### 🔗 Example

Input: Country `62`, Number `81234567890`
Output: https://wa.me/6281234567890

### Development

- `yarn dev` — run dev server
- `yarn build` — build for production
- `yarn preview` — preview production build
- `yarn format` — format with Prettier
