# KisanYantra — Marketing Site

Static, dependency-free marketing site for **KisanYantra** — a 0%-commission farm-equipment rental platform built for rural India.

> **Hosted as a static site.** Drop the folder on any static host (GitHub Pages, Netlify, Vercel, S3 + CloudFront, your own nginx) and you're live.

## What's inside

```
kisanyantra-website/
├── index.html             # All 10 sections (single page, anchor scroll)
├── css/
│   ├── styles.css         # Design tokens + layout + components + sections
│   └── animations.css     # Keyframes
├── js/
│   ├── main.js            # Smooth scroll, nav, persona tabs, stats, carousel, reveals
│   └── hero-3d.js         # Three.js hero scene (ES module)
├── assets/
│   ├── logo.png           # Brand mark
│   ├── logo-wordmark.png  # Brand + name
│   ├── equipment/         # 30 equipment PNGs (used by hero scene + carousel)
│   └── screenshots/       # ← Drop app screenshots here (replaces phone-mock placeholders)
└── README.md
```

No build step, no node_modules, no bundler. Open `index.html` directly or serve with any static server.

## Brand system (locked from the app)

| Token | Value |
|---|---|
| Saffron | `#FF6B00` |
| Forest Green | `#1A7A3B` |
| Warm Cream (bg) | `#FDFAF5` |
| Headings | Baloo 2 (Devanagari-ready) |
| Body | DM Sans |
| Card radius | 18px |

Fonts load from Google Fonts (`<link>` in `index.html`) — no local font files.

## CDN libraries (loaded inline from index.html)

| Lib | Purpose |
|---|---|
| **GSAP 3.12** + ScrollTrigger | Path-draw animation, parallax hills |
| **Lenis 1.1** | Inertial smooth scroll |
| **Three.js 0.160** (via importmap) | 3D hero scene |

If any CDN is unreachable, the site degrades gracefully:
- No GSAP → CSS keyframes still run, IntersectionObserver still reveals.
- No Lenis → native scroll, no harm.
- No WebGL → CSS orbiting equipment ring takes over.

## Run locally

Plain Python:

```bash
python3 -m http.server 8765
# → open http://localhost:8765
```

Or any of:

```bash
npx serve .
npx http-server -p 8765
```

Don't open `index.html` via `file://` — the ES-module Three.js script needs HTTP.

## Adding real screenshots

Each persona panel + the download CTA has a `.phone-mock__placeholder` div. Replace each with an `<img>`:

```html
<!-- Before -->
<div class="phone-mock__placeholder">
  <span class="phone-mock__chip">Farmer Home</span>
  <p>Replace with farmer dashboard screenshot.</p>
</div>

<!-- After -->
<img src="assets/screenshots/farmer-home.png" alt="Farmer dashboard"
     style="width: 100%; height: 100%; object-fit: cover;" />
```

Recommended dimensions: **3:6.4 aspect** (e.g. 750 × 1600) — matches the iPhone-style mock.

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
No build settings needed; Vercel detects the static site.

### S3 + CloudFront
```bash
aws s3 sync . s3://your-bucket --delete \
    --exclude ".git/*" --exclude "node_modules/*" --exclude "*.md"
```
Set the bucket to static-website hosting and point CloudFront at it.

## What's intentionally **not** in the site

- **Voice / audio interfaces** — feature isn't shipped yet. Site doesn't claim it.
- **Commission / "freemium" / "fair pricing" weasel words** — KisanYantra is 0% commission, full stop. Copy reflects that throughout.
- **Inflated stats** — placeholder numbers are honest (30+ equipment categories, 9 languages, 0% commission, 100% earnings to owners). Swap with real numbers as the platform grows.

## License

MIT — see [LICENSE](LICENSE).
