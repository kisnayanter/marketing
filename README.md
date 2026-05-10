# Kisan Sadhan — Marketing Site

Marketing site for **Kisan Sadhan**, a 0%-commission farm-equipment rental platform for rural India. Built from a Claude Design (claude.ai/design) handoff bundle.

> **Hosted as a static site.** Drop the folder on any static host (GitHub Pages, Netlify, Vercel, S3 + CloudFront, your own nginx) and it's live.

## Pages

| File | Purpose |
|---|---|
| `index.html`     | Hero with 3D parallax phone (cycles 3 screens), persona switcher, equipment categories, social proof, coverage map, language showcase, earnings calculator, payments-how, FAQ |
| `farmer.html`    | Farmer-focused page (saffron accent) |
| `owner.html`     | Owner page (forest green accent — earnings calculator, listing flow) |
| `operator.html`  | Operator page (operator blue `#2563EB` accent) |
| `catalog.html`   | Searchable + filterable equipment catalog (29 types) |
| `pricing.html`   | Pricing page (we're 0% — explains why and how the platform stays free) |
| `about.html`     | About / mission / coverage |
| `contact.html`   | Contact + helpline + early-access form |
| `privacy.html`   | Privacy Policy (DPDP Act 2023 template — needs legal review) |
| `terms.html`     | Terms &amp; Conditions (template — needs legal review) |

`privacy.html` and `terms.html` carry a saffron "Template notice" banner and `[placeholder]` markers for spots a lawyer needs to fill in (registered office, jurisdiction city, named grievance officer).

## Design system

All tokens live in `tokens.css`:

| Token | Value | Use |
|---|---|---|
| `--ky-saffron`    | `#FF6B00` | Farmer accent, primary brand |
| `--ky-forest`     | `#1A7A3B` | Owner accent |
| `--ky-op-blue`    | `#2563EB` | **Operator accent** (the app's operator role is blue) |
| `--ky-amber`      | `#F59E0B` | Highlight / pricing tier |
| `--ky-cream`      | `#FDFAF5` | Page background |
| `--ky-ink`        | `#1E1A12` | Text + dark surfaces |
| `--r-card`        | `18px`   | Card radius |
| `--f-display`     | Baloo 2 + Noto Sans Devanagari | Headings (Devanagari-ready) |
| `--f-body`        | DM Sans  | Body |

## Architecture

Each page is a single HTML file with **React 18 + Babel-standalone** loaded from CDN, executing JSX in-browser:

```
index.html  →  components.jsx + sections.jsx
*.html      →  components.jsx + inline JSX
privacy.html / terms.html  →  plain HTML (no React)
```

`components.jsx` is the shared library: logo, role context, `Phone` / `ScreenshotPhone`, `StoreBadge`, `Pill`, `Button`, `Icon`, `CyclingTagline`, `LANG_LIST`, `SCREENS` map. `sections.jsx` is index.html-only and defines the marketing sections (`Hero3D`, `PersonaSwitcher`, `EquipmentCategories`, `Features`, `LangShowcase`, `EarningsCalculator`, `PaymentsHow`, `FAQ`, `Footer`, etc.).

**React was switched from `.development.js` to `.production.min.js`** (`react@18.3.1` and `react-dom@18.3.1`) — saves ~1.4 MB per page-load. Babel-standalone has no production variant, so the JSX-in-browser cost remains.

## Assets

```
equipment/   (10 PNGs)   used by EquipmentCategories on index.html
screens/     (13 PNGs)   real app screenshots — used in Hero3D + persona panels
uploads/     (28 PNGs)   full equipment set for catalog.html + 3 person photos
```

All images were resized to **720 px wide** via `sips` before commit (originals were 1170×2532 phone-native and ran ~1.5–5 MB each; now most are <500 KB).

## Run locally

```bash
python3 -m http.server 8765
# → open http://localhost:8765
```

Or:

```bash
npx serve .
npx http-server -p 8765
```

The pages won't render via `file://` — Babel needs HTTP to load `components.jsx`/`sections.jsx`.

## Deploy

### GitHub Pages
1. Push to a repo
2. Settings → Pages → Source: **Deploy from a branch** → `main` → `/ (root)` → Save
3. Live at `https://<user>.github.io/<repo>/`

### Netlify
- Drag-drop the folder at https://app.netlify.com/drop, or
- Connect the GitHub repo: build command empty, publish directory `.`

### Vercel
```bash
npx vercel --prod
```

### S3 + CloudFront
```bash
aws s3 sync . s3://your-bucket --delete --exclude ".git/*" --exclude "*.md"
```

### Firebase Hosting (via GitHub Actions)

Project: **`kisan-yantra`** (shared with the mobile app's Firebase project — `firebase.json` + `.firebaserc` are committed). Manual-trigger workflow lives at `.github/workflows/firebase-deploy.yml`.

**One-time setup:**

1. **Enable Hosting** for the `kisan-yantra` project at [console.firebase.google.com](https://console.firebase.google.com/) → Hosting → Get started.
2. **Generate a deploy service account:**
   - Run `firebase init hosting:github` locally once (it auto-generates a service account, attaches the right IAM role, and writes the JSON secret to the repo). Requires `npm i -g firebase-tools` + `firebase login`.
   - **Or manually**: Firebase Console → Project Settings → Service Accounts → "Generate new private key" → download the JSON.
3. **Add the secret to GitHub**: repo → Settings → Secrets and variables → Actions → New repository secret.
   - Name: `FIREBASE_SERVICE_ACCOUNT_KISAN_YANTRA`
   - Value: paste the entire service-account JSON file content.

**Deploy:**

- GitHub → Actions tab → "Deploy to Firebase Hosting" → **Run workflow** → pick channel:
  - `live` → publishes to the production URL (`https://kisan-yantra.web.app`)
  - `preview` → spins up a 7-day preview channel at `preview-<run-number>` (great for sharing a draft before going live)

**Local deploy** (skips CI, useful for first push):

```bash
npm i -g firebase-tools
firebase login
firebase deploy --only hosting
```

## Production hardening notes

If page-load weight becomes an issue, the next step is to **pre-compile the JSX** (Babel in-browser is the biggest cost on first paint):

```bash
npx esbuild --bundle --loader=jsx components.jsx --outfile=components.js
npx esbuild --bundle --loader=jsx sections.jsx --outfile=sections.js
# then in HTMLs: change src=".jsx" → src=".js", drop the babel-standalone <script>, drop type="text/babel"
```

That removes the ~3 MB Babel runtime entirely, leaving just React/ReactDOM (~140 KB compressed).

## What's intentionally NOT in the site

- **Voice / audio interfaces** — feature isn't shipped yet. Earlier copy mentioned voice; it's been scrubbed throughout.
- **Native UPI / payment processing** — Kisan Sadhan does **not** handle money. Payments are settled directly between renter and owner via cash or UPI, outside the platform. The terms reflect this.
- **Commission / fair-pricing weasel words** — Kisan Sadhan is 0% commission, full stop.

## License

MIT — see [LICENSE](LICENSE).
