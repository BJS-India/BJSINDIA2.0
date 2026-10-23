# BJS 2.0 React frontend

React JavaScript + Vite, plain responsive CSS, and locally bundled fonts and Figma assets.

## Run

```sh
npm install
npm run dev
```

Use the local URL printed by Vite. `npm run build` produces `dist/`; `npm run preview` serves that production build.

### Windows and WSL

Vite's dependency cache is stored in the OS temporary directory under `bjs-vite/`, separated by project, platform and architecture. This keeps Windows and Linux optimizer caches separate.

The local Ubuntu-24.04 distribution was confirmed to use **WSL 1**. Dependency optimization reproduced `EACCES` on directory rename even with a fresh, user-owned cache outside the project. Moving or clearing the cache did not resolve it. Microsoft documents a [WSL 1 folder-rename limitation with file watchers](https://code.visualstudio.com/docs/remote/wsl#_i-see-eacces-permission-denied-error-trying-to-rename-a-folder-in-the-open-workspace-in-wsl-1).

`npm run dev` now detects WSL 1 and launches Vite using Windows Node automatically. It bridges the WSL console through ignored `.dev-logs/` files and prints output in the same terminal. Windows Node is discovered from WSL's PATH; if needed, set `BJS_WINDOWS_NODE` to its WSL path (for example `/mnt/c/Program Files/nodejs/node.exe`). Windows and WSL 2 use their current Node runtime normally. Port 5173 is required by default so a second process cannot silently start on a different port; use `npm run dev -- --port 5174` when intentionally running another instance.

Stop any older WSL Vite process with Ctrl+C before restarting `npm run dev`. You can also run directly from a **PowerShell** terminal:

```powershell
Set-Location C:\Users\rargade\BJS2.0
npm run dev
```

The frontend remains usable from the same browser and workspace. Native Linux development should use WSL 2. Changing the distribution version is a separate machine setup step; this project does not change it automatically. Do not run npm or Vite with sudo or apply broad permission changes to work around this issue.

## Screens

- `/`: LandingPage_SP, Figma node `749:711`.
- `/about`: About Us, Figma node `1277:1200`.
- `/our-work`: The previous Our Work implementation remains available as a navigation destination; it is outside the corrected two-screen scope.

Source: https://www.figma.com/design/eW7a8Jr17ZWkZGgESgry45/BJS-2.0-Website?node-id=0-1

The corrected pages and their shared components are in `src/ApprovedPages.jsx`, with styling in `src/approved.css` and local asset mappings in `src/approvedAssets.js`. `src/App.jsx` handles routing. The previous Our Work page remains in `src/Pages.jsx`. Original images and SVGs are served from `public/assets/`; mobile layouts are adapted from the supplied desktop frames.

`src/landing-desktop.css` contains the measured LandingPage_SP layout. At desktop widths it scales the 1440px Figma frame proportionally up to its native size; the reference page height is 5296px and the content gutters are 98px. `node scripts/measure-landing.mjs` compares key positions, dimensions and font sizes against those Figma measurements at 1440px and 1366px, and captures a mobile check at 390px.

## PHP integration

No backend is included. Copy `.env.example` to `.env.local`, then set `VITE_API_BASE_URL` to the future PHP API base URL. Align `src/api.js` with the backend team's final endpoint contract.

The proposed newsletter request is `POST {baseUrl}/newsletter/subscribe`, with JSON body `{ "email": "name@example.com" }` or `{ "whatsapp": "+919876543210" }`, matching the revised newsletter field. Until configured, the UI explains that subscriptions are unavailable and does not claim to save data. Handle CORS on the PHP side if frontend and API use different origins. Environment variables prefixed `VITE_` are public browser configuration; do not put secrets in them.

Configure the production web server to serve `index.html` for application routes such as `/about` and `/our-work`, while serving real asset files normally. The PHP API path must be excluded from that fallback.

## Content still needed before launch

- The approved landing design contains repeated testimonial names, grey video slots and play artwork. These have been preserved for content review.
- Awards & Recognition contains 16 awards from the supplied CSV, ordered from 1986 to 2020. Add JPG, JPEG, PNG, or WebP photos using the filename stems listed in `public/assets/awards/README.md`; uppercase extensions work too. Photos are detected automatically, existing matching photos remain as fallbacks, and missing photos leave a neutral image area. Award content is maintained in `src/awardsData.js`. The BJS Journey retains its original seven milestone years and default 1993 Shanti Yatra card.
- Impact statistics were supplied for Blue Roots. Other tabs show the programme introduction and a link until their approved impact data is supplied.
- Supply video URLs to enable video playback. Media controls currently browse the supplied thumbnails.
- Supply official donation, social-profile, partner and programme-detail URLs. Donation and information enquiries currently use the supplied BJS email address. Social icons are displayed without invented profile links.
- The About Us people cards expand information enquiries. Programme detail pages remain outside the corrected two-screen scope.

## Verification

`npm run build` checks the production bundle. `npm run verify` runs checks for LandingPage_SP and About Us with locally installed Google Chrome. It captures desktop and mobile screenshots, checks image loading and page overflow, and exercises mobile navigation, impact tabs, newsletter state, journey selection, and people-card expansion. Start Vite first; set `VERIFY_BASE_URL` if its port differs from 5173. Browser screenshots and reports are written to ignored `artifacts/`.
