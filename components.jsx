// KisanYantra — shared UI components
// Expects React + ReactDOM loaded globally.

const { useState, useEffect, useRef, useMemo, createContext, useContext } = React;

// ---------- Viewport hook ----------
// Returns `true` when the viewport is at or below `maxWidth`. Subscribes to
// matchMedia changes so layout swaps (e.g. tabs → accordion) react to resize.
function useIsBelow(maxWidth = 900) {
  const [below, setBelow] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(`(max-width: ${maxWidth}px)`).matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const onChange = () => setBelow(mq.matches);
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange);
    };
  }, [maxWidth]);
  return below;
}

// ---------- Role & language context ----------
const RoleCtx = React.createContext({ role: "farmer", setRole: () => {} });

const ROLES = {
  farmer: {
    label: "Farmer",
    hindi: "किसान",
    tag: "Kisaan",
    accent: "var(--ky-saffron)",
    accentSoft: "var(--ky-saffron-soft)",
    accentDeep: "var(--ky-saffron-deep)",
    heroKicker: "For farmers who grow our food",
  },
  owner: {
    label: "Owner",
    hindi: "मालिक",
    tag: "Maalik",
    accent: "var(--ky-forest)",
    accentSoft: "var(--ky-forest-soft)",
    accentDeep: "var(--ky-forest-deep)",
    heroKicker: "For owners who keep machines earning",
  },
  operator: {
    label: "Operator",
    hindi: "चालक",
    tag: "Chaalak",
    accent: "var(--ky-op-blue)",
    accentSoft: "var(--ky-op-blue-soft)",
    accentDeep: "var(--ky-op-blue-deep)",
    heroKicker: "For operators who run the fields",
  },
};

// ---------- Logo ----------
// `size` is the rendered HEIGHT in px; width auto-scales by the image's
// aspect ratio (~549/455 ≈ 1.21). Callers historically passed size=30–34
// as the icon-only height; we bump those small values up so the wordmark
// (which is now baked into the image) reads at the same visual weight.
// `mono=true` (used in the dark-background footer) flips the colors via
// a CSS filter so the brand stays readable.
function KYLogo({ size = 32, mono = false }) {
  // Callers historically passed size=30–34 as a small icon-only height. The
  // new image bakes the wordmark in, so we scale up generously (~2.2×) so
  // the brand reads at proper marketing weight in the nav and footer.
  const renderHeight = size * 2.2;
  return (
    <img
      src="logo.png"
      alt="KisanYantra"
      style={{
        height: renderHeight,
        width: "auto",
        display: "block",
        filter: mono ? "brightness(0) invert(1)" : "none",
      }}
    />
  );
}

// ---------- Button ----------
function Btn({ children, variant = "primary", size = "md", icon, iconRight, style = {}, ...rest }) {
  const h = size === "lg" ? 56 : size === "sm" ? 36 : 46;
  const px = size === "lg" ? 28 : size === "sm" ? 14 : 20;
  const fs = size === "lg" ? 16 : size === "sm" ? 13 : 14.5;
  const bg = {
    primary: "var(--ky-saffron)",
    forest: "var(--ky-forest)",
    ink: "var(--ky-ink)",
    ghost: "transparent",
    cream: "var(--ky-cream)",
  }[variant];
  const color = variant === "ghost" ? "var(--ky-ink)" :
                variant === "cream" ? "var(--ky-ink)" : "var(--ky-cream)";
  const border = variant === "ghost" ? "1px solid var(--ky-cream-line)" :
                 variant === "cream" ? "1px solid var(--ky-cream-line)" : "none";
  const shadow = variant === "primary" ? "var(--sh-saffron)" :
                 variant === "ghost" ? "none" : "var(--sh-md)";
  return (
    <button
      {...rest}
      style={{
        height: h, padding: `0 ${px}px`, fontSize: fs, fontWeight: 600,
        background: bg, color, border,
        borderRadius: "var(--r-btn)",
        display: "inline-flex", alignItems: "center", gap: 8,
        boxShadow: shadow,
        letterSpacing: "-0.005em",
        transition: "transform .15s ease, box-shadow .15s ease",
        ...style,
      }}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  );
}

// ---------- Store badges ----------
function StoreBadge({ store = "play", dark = true }) {
  const bg = dark ? "#1E1A12" : "var(--ky-cream)";
  const fg = dark ? "var(--ky-cream)" : "var(--ky-ink)";
  const sub = dark ? "rgba(253,250,245,0.7)" : "var(--ky-ink-3)";
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      padding: "10px 18px",
      background: bg, color: fg,
      borderRadius: 12,
      border: dark ? "none" : "1px solid var(--ky-cream-line)",
      minWidth: 168,
    }}>
      {store === "play" ? (
        <svg width="22" height="24" viewBox="0 0 22 24" aria-hidden>
          <path d="M1.5 1 L15 12 L1.5 23 Z" fill="#FF6B00"/>
          <path d="M1.5 1 L15 12 L10 7.5 Z" fill="#FFA85C" opacity="0.8"/>
          <path d="M1.5 23 L15 12 L10 16.5 Z" fill="#E85D00" opacity="0.9"/>
          <path d="M15 12 L20 9 L20 15 Z" fill="#1A7A3B"/>
        </svg>
      ) : (
        <svg width="20" height="24" viewBox="0 0 20 24" aria-hidden>
          <path fill={fg} d="M14.3 12.7c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.15-2.9.9-3.7.9-.8 0-2-.9-3.2-.9-1.6 0-3.2 1-4 2.5-1.7 2.9-.4 7.3 1.3 9.7.8 1.2 1.8 2.5 3.1 2.4 1.2-.05 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3-.02 2.2-1.2 3-2.4.95-1.4 1.3-2.7 1.35-2.8-.03-.01-2.6-1-2.6-3.9zM12 4.6c.7-.85 1.2-2 1.05-3.15-1 .04-2.3.7-3 1.55-.65.75-1.25 2-1.1 3.1 1.15.1 2.3-.6 3.05-1.5z"/>
        </svg>
      )}
      <div style={{ lineHeight: 1.1, textAlign: "left" }}>
        <div style={{ fontSize: 10, color: sub, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {store === "play" ? "Get it on" : "Download on the"}
        </div>
        <div style={{ fontFamily: "var(--f-display)", fontWeight: 700, fontSize: 17 }}>
          {store === "play" ? "Google Play" : "App Store"}
        </div>
      </div>
    </div>
  );
}

// ---------- Pill ----------
function Pill({ children, accent = "saffron", style = {} }) {
  const colors = {
    saffron: { bg: "var(--ky-saffron-tint)", fg: "var(--ky-saffron-deep)", dot: "var(--ky-saffron)" },
    forest: { bg: "var(--ky-forest-soft)", fg: "var(--ky-forest-deep)", dot: "var(--ky-forest)" },
    operator: { bg: "var(--ky-op-blue-soft)", fg: "var(--ky-op-blue-deep)", dot: "var(--ky-op-blue)" },
    amber: { bg: "var(--ky-amber-soft)", fg: "#92400E", dot: "var(--ky-amber)" },
    ink: { bg: "var(--ky-cream-deep)", fg: "var(--ky-ink)", dot: "var(--ky-ink)" },
  }[accent];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "6px 12px",
      borderRadius: "var(--r-pill)",
      background: colors.bg, color: colors.fg,
      fontSize: 12.5, fontWeight: 600, letterSpacing: "0.02em",
      ...style,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: 999, background: colors.dot,
      }}/>
      {children}
    </span>
  );
}

// ---------- SectionHeader ----------
function SectionHeader({ kicker, kickerHindi, title, titleHindi, sub, align = "left", accent = "saffron" }) {
  return (
    <div style={{
      textAlign: align, maxWidth: align === "center" ? 780 : 820,
      margin: align === "center" ? "0 auto" : 0,
      marginBottom: 40,
    }}>
      {kicker && (
        <div style={{ marginBottom: 16, display: "flex", gap: 10, justifyContent: align === "center" ? "center" : "flex-start", alignItems: "center" }}>
          <Pill accent={accent}>{kicker}</Pill>
          {kickerHindi && (
            <span style={{
              fontFamily: "var(--f-display)", fontSize: 15, color: "var(--ky-ink-3)",
            }}>{kickerHindi}</span>
          )}
        </div>
      )}
      <h2 style={{
        fontFamily: "var(--f-display)",
        fontSize: 52, lineHeight: 1.05, letterSpacing: "-0.02em",
        margin: 0, fontWeight: 700,
        color: "var(--ky-ink)",
        textWrap: "balance",
      }}>
        {title}
        {titleHindi && (
          <span style={{ display: "block", fontSize: 28, color: "var(--ky-ink-3)", fontWeight: 500, marginTop: 8, letterSpacing: "-0.01em" }}>
            {titleHindi}
          </span>
        )}
      </h2>
      {sub && (
        <p style={{
          marginTop: 16, fontSize: 18, lineHeight: 1.55, color: "var(--ky-ink-2)",
          maxWidth: 620, marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0,
          textWrap: "pretty",
        }}>{sub}</p>
      )}
    </div>
  );
}

// ---------- Nav ----------
function Nav({ role, setRole, lang, setLang, compact = false }) {
  return (
    <nav style={{
      position: "relative", zIndex: 10,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: compact ? "18px 24px" : "22px 64px",
      borderBottom: "1px solid var(--ky-cream-line)",
      background: "rgba(253,250,245,0.85)",
      backdropFilter: "blur(8px)",
    }}>
      <KYLogo size={compact ? 28 : 34}/>
      {!compact && (
        <div style={{
          display: "flex", gap: 4, padding: 4,
          background: "var(--ky-cream-deep)",
          borderRadius: "var(--r-pill)",
          border: "1px solid var(--ky-cream-line)",
        }}>
          {Object.entries(ROLES).map(([key, r]) => (
            <button
              key={key}
              onClick={() => setRole(key)}
              style={{
                padding: "8px 18px",
                background: role === key ? "var(--ky-cream)" : "transparent",
                color: role === key ? "var(--ky-ink)" : "var(--ky-ink-3)",
                border: "none",
                borderRadius: "var(--r-pill)",
                fontSize: 14, fontWeight: 600,
                boxShadow: role === key ? "var(--sh-sm)" : "none",
                display: "flex", alignItems: "center", gap: 8,
              }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: role === key ? r.accent : "var(--ky-ink-4)" }}/>
              For {r.label}s
            </button>
          ))}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <LangFlip lang={lang} setLang={setLang} />
        <Btn variant="primary" size="sm" icon={
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 2v9m0 0l-3-3m3 3l3-3M2 13h10" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
        }>Download App</Btn>
      </div>
    </nav>
  );
}

// ---------- Language flip ----------
const LANG_LIST = [
  { code: "hi", label: "हिंदी", translit: "Hindi" },
  { code: "ta", label: "தமிழ்", translit: "Tamil" },
  { code: "mr", label: "मराठी", translit: "Marathi" },
  { code: "bn", label: "বাংলা", translit: "Bengali" },
  { code: "gu", label: "ગુજરાતી", translit: "Gujarati" },
  { code: "kn", label: "ಕನ್ನಡ", translit: "Kannada" },
  { code: "ml", label: "മലയാളം", translit: "Malayalam" },
  { code: "pa", label: "ਪੰਜਾਬੀ", translit: "Punjabi" },
  { code: "te", label: "తెలుగు", translit: "Telugu" },
  { code: "en", label: "English", translit: "English" },
];

function LangFlip({ lang, setLang }) {
  return (
    <button
      onClick={() => {
        const idx = LANG_LIST.findIndex(l => l.code === lang);
        setLang(LANG_LIST[(idx + 1) % LANG_LIST.length].code);
      }}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        height: 38, padding: "0 14px",
        border: "1px solid var(--ky-cream-line)",
        background: "var(--ky-cream)",
        borderRadius: "var(--r-pill)",
        fontSize: 14, fontWeight: 600, color: "var(--ky-ink-2)",
      }}>
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
        <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M1 7h12M7 1c2 2 2 10 0 12M7 1c-2 2-2 10 0 12" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
      <span style={{ fontFamily: "var(--f-display)", fontSize: 15 }}>
        {LANG_LIST.find(l => l.code === lang)?.label}
      </span>
      <span style={{ fontSize: 11, color: "var(--ky-ink-4)" }}>+8</span>
    </button>
  );
}

// ---------- Cycling multilingual tagline ----------
const TAGLINES = [
  { script: "en", head: "Farm equipment,", tail: "in your language.", font: "var(--f-display)" },
  { script: "hi", head: "खेती के यंत्र,", tail: "आपकी भाषा में।", font: "var(--f-display)" },
  { script: "ta", head: "விவசாய கருவிகள்,", tail: "உங்கள் மொழியில்.", font: "var(--f-display)" },
  { script: "mr", head: "शेतीची यंत्रे,", tail: "तुमच्या भाषेत.", font: "var(--f-display)" },
  { script: "bn", head: "কৃষির যন্ত্র,", tail: "আপনার ভাষায়।", font: "var(--f-display)" },
];

function CyclingTagline({ size = 96, paused = false }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx(i => (i + 1) % TAGLINES.length), 2600);
    return () => clearInterval(t);
  }, [paused]);
  return (
    <div style={{ position: "relative" }}>
      {/* Invisible "tallest" tagline keeps layout stable — English is usually widest */}
      <h1 aria-hidden="true" style={{ margin: 0, fontFamily: "var(--f-display)", fontSize: size, lineHeight: 1.15, letterSpacing: "-0.025em", fontWeight: 800, visibility: "hidden", pointerEvents: "none", userSelect: "none" }}>
        Farm equipment,<br/><span>in your language.</span>
      </h1>
      {/* Animated taglines layered on top */}
      {TAGLINES.map((t, i) => (
        <div key={i} style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          opacity: i === idx ? 1 : 0,
          transform: i === idx ? "translateY(0)" : "translateY(10px)",
          transition: "opacity .45s ease, transform .5s cubic-bezier(.2,.9,.25,1)",
          pointerEvents: i === idx ? "auto" : "none",
        }}>
          <h1 style={{
            margin: 0,
            fontFamily: t.font,
            fontSize: size,
            lineHeight: 1.15,
            letterSpacing: "-0.025em",
            fontWeight: 800,
            color: "var(--ky-ink)",
            textWrap: "balance",
          }}>
            {t.head}<br/>
            <span style={{ color: "var(--ky-saffron)" }}>{t.tail}</span>
          </h1>
        </div>
      ))}
    </div>
  );
}

// ---------- Phone frame ----------
function Phone({ children, width = 300, tilt = 0, style = {} }) {
  const ratio = 2.05;
  const height = width * ratio;
  return (
    <div style={{
      width, height,
      background: "#1E1A12",
      borderRadius: 42,
      padding: 10,
      boxShadow: "0 30px 60px rgba(30,26,18,0.25), 0 8px 20px rgba(30,26,18,0.12), inset 0 0 0 1.5px rgba(255,255,255,0.08)",
      transform: tilt ? `rotate(${tilt}deg)` : "none",
      ...style,
    }}>
      <div style={{
        width: "100%", height: "100%",
        background: "var(--ky-cream)",
        borderRadius: 34,
        overflow: "hidden",
        position: "relative",
      }}>
        {/* notch */}
        <div style={{
          position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
          width: 90, height: 24, background: "#1E1A12", borderRadius: 999, zIndex: 5,
        }}/>
        {children}
      </div>
    </div>
  );
}

// ---------- Phone with real screenshot (no notch — image has status bar baked in) ----------
function ScreenshotPhone({ src, width = 300, tilt = 0, style = {}, glow = "var(--ky-saffron)" }) {
  // Source images are 462 x 1004 (iPhone aspect ~2.17)
  const ratio = 2.165;
  const height = width * ratio;
  return (
    <div style={{
      width, height,
      background: "#1E1A12",
      borderRadius: width * 0.14,
      padding: width * 0.024,
      boxShadow: `0 30px 60px rgba(30,26,18,0.28), 0 8px 20px rgba(30,26,18,0.14), 0 0 0 1px rgba(255,255,255,0.04), inset 0 0 0 1.5px rgba(255,255,255,0.10)`,
      transform: tilt ? `rotate(${tilt}deg)` : "none",
      position: "relative",
      ...style,
    }}>
      <div style={{
        width: "100%", height: "100%",
        background: "var(--ky-cream)",
        borderRadius: width * 0.118,
        overflow: "hidden",
        position: "relative",
      }}>
        <img
          src={src}
          alt=""
          draggable="false"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", userSelect: "none" }}
        />
      </div>
    </div>
  );
}

// ---------- Screenshot library ----------
const SCREENS = {
  postRequest: "screens/farmer-post-request.png",
  bookings: "screens/farmer-bookings.png",
  notifications: "screens/farmer-notifications-tamil.png",
  ownerRegister: "screens/owner-register.png",
  language: "screens/language-select.png",
  roleSelect: "screens/role-select-hindi.png",
  ownerHome: "screens/owner-home.png",
  ownerListings: "screens/owner-listings.png",
  ownerActions: "screens/owner-quick-actions.png",
  ownerPayment: "screens/owner-payment.png",
  ownerIncoming: "screens/owner-incoming.png",
  farmerTrack: "screens/farmer-track.png",
  operatorHome: "screens/operator-home.png",
};

// ---------- Phosphor-style icons (regular weight, 1.6 stroke) ----------
function Icon({ name, size = 22, color = "currentColor", weight = "regular" }) {
  const s = size;
  const sw = weight === "fill" ? 0 : 1.6;
  const fill = weight === "fill" ? color : "none";
  const stroke = weight === "fill" ? "none" : color;
  const props = { width: s, height: s, viewBox: "0 0 24 24", fill, stroke, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  switch (name) {
    case "tractor": return (
      <svg {...props}>
        <circle cx="7" cy="17" r="3.5"/>
        <circle cx="18" cy="17.5" r="2.5"/>
        <path d="M3 13 L3 9 L8 9 L10 5 L14 5 L14 13"/>
        <path d="M14 14 L21 14 L21 17"/>
      </svg>
    );
    case "sealCheck": return (
      <svg {...props}>
        <path d="M12 2.5 L14.5 4 L17.5 3.5 L19 6 L21.5 7 L21 10 L22 12.5 L20 14.5 L20 17.5 L17.5 18.5 L16 21 L13 20.5 L11 22 L9 20.5 L6 21 L4.5 18.5 L2 17.5 L2 14.5 L0.5 12 L1 9.5 L1 7 L4 6 L5 3.5 L8 4 L10.5 2.5 Z"/>
        <path d="M8 12 L11 15 L16 9.5"/>
      </svg>
    );
    case "lightning": return (
      <svg {...props}>
        <path d="M13 2 L4 14 L11 14 L11 22 L20 10 L13 10 Z"/>
      </svg>
    );
    case "wallet": return (
      <svg {...props}>
        <path d="M3 7 V18 a2 2 0 0 0 2 2 H20 a1 1 0 0 0 1 -1 V11 a1 1 0 0 0 -1 -1 H5 a2 2 0 0 1 -2 -2 V7 a2 2 0 0 1 2 -2 H18"/>
        <circle cx="17" cy="15" r="1.2" fill={color} stroke="none"/>
      </svg>
    );
    case "mapPin": return (
      <svg {...props}>
        <path d="M12 2 C7.5 2 4 5.5 4 10 C4 16 12 22 12 22 C12 22 20 16 20 10 C20 5.5 16.5 2 12 2 Z"/>
        <circle cx="12" cy="10" r="2.8"/>
      </svg>
    );
    case "calendar": return (
      <svg {...props}>
        <rect x="3" y="5" width="18" height="16" rx="2"/>
        <path d="M3 10 H21 M8 3 V7 M16 3 V7"/>
      </svg>
    );
    case "star": return (
      <svg {...props}><path d="M12 3 L14.5 9 L21 9.5 L16 14 L17.5 20.5 L12 17 L6.5 20.5 L8 14 L3 9.5 L9.5 9 Z"/></svg>
    );
    case "chat": return (
      <svg {...props}>
        <path d="M4 5 H20 a2 2 0 0 1 2 2 V15 a2 2 0 0 1 -2 2 H13 L8 21.5 V17 H4 a2 2 0 0 1 -2 -2 V7 a2 2 0 0 1 2 -2 Z"/>
      </svg>
    );
    case "bell": return (
      <svg {...props}>
        <path d="M6 9 a6 6 0 0 1 12 0 v3 l2 4 H4 l2 -4 Z"/>
        <path d="M10 19 a2 2 0 0 0 4 0"/>
      </svg>
    );
    case "globe": return (
      <svg {...props}>
        <circle cx="12" cy="12" r="9"/>
        <path d="M3 12 H21 M12 3 C14.5 6 14.5 18 12 21 M12 3 C9.5 6 9.5 18 12 21"/>
      </svg>
    );
    case "shield": return (
      <svg {...props}>
        <path d="M12 2 L4 5 V11 C4 16 8 20 12 22 C16 20 20 16 20 11 V5 Z"/>
        <path d="M9 12 L11 14 L15 10"/>
      </svg>
    );
    case "rupee": return (
      <svg {...props}>
        <path d="M7 5 H17 M7 9 H17 M7 5 C12 5 14 9 11 13 H7 L15 21"/>
      </svg>
    );
    case "arrowRight": return (
      <svg {...props}><path d="M4 12 H20 M14 6 L20 12 L14 18"/></svg>
    );
    case "plus": return (
      <svg {...props}><path d="M12 4 V20 M4 12 H20"/></svg>
    );
    case "users": return (
      <svg {...props}>
        <circle cx="9" cy="8" r="3.5"/>
        <path d="M2 20 c0 -3.5 3 -6 7 -6 s7 2.5 7 6"/>
        <circle cx="17" cy="9" r="2.8"/>
        <path d="M16 14 c3 0 6 2.2 6 5"/>
      </svg>
    );
    case "play": return (
      <svg {...props}><path d="M7 4 L20 12 L7 20 Z"/></svg>
    );
    default: return <svg {...props}><circle cx="12" cy="12" r="9"/></svg>;
  }
}

// expose
Object.assign(window, {
  RoleCtx, ROLES, LANG_LIST, TAGLINES,
  KYLogo, Btn, StoreBadge, Pill, SectionHeader,
  Nav, LangFlip, CyclingTagline, Phone, ScreenshotPhone,
  SCREENS, Icon,
  useIsBelow,
});
