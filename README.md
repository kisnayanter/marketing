# KisanYantra — Marketing Site

Static, dependency-free marketing site for **KisanYantra** — a 0%-commission farm-equipment rental platform built for rural India.

> **Hosted as a static site.** Drop the folder on any static host (GitHub Pages, Netlify, Vercel, S3 + CloudFront, your own nginx) and you're live.

## Pages

| File | Purpose |
|---|---|
| `index.html`         | Hero + persona teasers + key features + 9-language banner + stats + download CTA |
| `for-farmers.html`   | Farmer story with real screenshots (post-request, bookings, track, notifications) |
| `for-owners.html`    | Owner story with real screenshots (home with earnings, register, incoming, payment, quick actions) |
| `for-operators.html` | Operator story with real screenshots |
| `equipment.html`     | Static, filterable grid of all 30 equipment categories |
| `privacy.html`       | Privacy Policy (template — needs legal review) |
| `terms.html`         | Terms &amp; Conditions (template — needs legal review) |

> The privacy and terms pages carry a visible "template — review by qualified counsel before publishing" banner, plus `[placeholder]` markers in the spots a lawyer needs to fill in (registered office, jurisdiction city, named grievance officer).

## Layout

```
kisanyantra-website/
├── index.html
├── for-farmers.html
├── for-owners.html
├── for-operators.html
├── equipment.html
├── privacy.html
├── terms.html
├── css/
│   ├── styles.css         # Design tokens + components + per-section styles
│   └── animations.css     # Keyframes only (lightweight)
├── js/
│   └── main.js            # IntersectionObserver-driven; no frameworks, no CDN libs
├── assets/
│   ├── logo.png
│   ├── logo-wordmark.png
│   ├── equipment/         # 30 equipment PNGs — used on equipment.html and hero
│   └── screenshots/       # 12 device screenshots — used in persona pages + hero
├── README.md
├── LICENSE
└── .gitignore
```

**Zero build step. No node_modules. No CDN libraries.** Open any HTML file directly or serve with any static server.

## Why no GSAP / Three.js / Lenis?

The first iteration loaded GSAP, ScrollTrigger, Lenis and Three.js for a 3D hero scene. Performance complaints in early review told us the per-frame work (Three.js scene + 30-card 3D carousel) was too heavy on rural-India devices. The current build:

- Drops Three.js entirely — hero shows a real device mockup with the actual app screenshot, surrounded by lightly bobbing equipment icons (CSS `@keyframes` only).
- Drops the 3D carousel — replaced with a static, filterable equipment grid.
- Replaces GSAP scroll triggers with `IntersectionObserver` — fires once per element on view, not every frame.
- Replaces Lenis with the browser's native `scroll-behavior: smooth`.

Total JS shipped per page is now ~5 KB minified-equivalent.

## Brand system (locked from the app)

| Token | Value |
|---|---|
| Saffron | `#FF6B00` |
| Forest Green | `#1A7A3B` |
| Warm Cream (bg) | `#FDFAF5` |
| Headings | Baloo 2 (Devanagari-ready) |
| Body | DM Sans |
| Card radius | 18px |

Fonts load from Google Fonts (`<link>` in every page). No local font files.

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

Each page works in isolation — you can deploy a single `*.html` and it'll render fine, as long as `css/`, `js/` and `assets/` are alongside.

## Adding / replacing screenshots

The 12 screenshots in `assets/screenshots/` were resized from 1170×2532 (iPhone Pro Max native) to 720px wide via `sips`. To add a new one:

```bash
cp ~/Downloads/your-screenshot.png assets/screenshots/your-name.png
sips --resampleWidth 720 assets/screenshots/your-name.png
```

Then reference it in a `<div class="device"><div class="device__screen"><img src="assets/screenshots/your-name.png" alt="..." /></div></div>` block on whichever page.

## Deploy

### GitHub Pages
1. Push this folder to a repo.
2. Settings → Pages → Source: **Deploy from a branch** → `main` / `/ (root)` → Save.
3. Site is live at `https://<user>.github.io/<repo>/`.

### Netlify
- Drag-and-drop the folder at https://app.netlify.com/drop, or
- Connect the GitHub repo with build command empty + publish directory `.`.

### Vercel
```bash
npx vercel --prod
```
No build settings; Vercel detects the static site.

### S3 + CloudFront
```bash
aws s3 sync . s3://your-bucket --delete \
    --exclude ".git/*" --exclude "*.md"
```

## What's intentionally NOT in the site

- **Voice / audio interfaces** — feature isn't shipped yet.
- **Commission / fair-pricing weasel words** — KisanYantra is 0% commission, full stop.
- **Inflated stats** — placeholders are honest (30+ equipment, 9 languages, 0% commission, 100% earnings to owners).

## License

MIT — see [LICENSE](LICENSE).
