// Kisan Sadhan — page sections (rewritten with real app screenshots)

const { useState: useS, useEffect: useE, useRef: useR, useMemo: useM } = React;

// ============================================================
// HERO — saffron-cream, real screenshot of farmer home, floating UI snippets
// ============================================================
function Hero({ role, lang, dark = false }) {
  const r = ROLES[role];
  const bg = dark ? "var(--ky-forest-night)" : "var(--ky-cream)";
  const ink = dark ? "var(--ky-cream)" : "var(--ky-ink)";
  const ink2 = dark ? "rgba(253,250,245,0.78)" : "var(--ky-ink-2)";
  const ink3 = dark ? "rgba(253,250,245,0.55)" : "var(--ky-ink-3)";
  const ink4 = dark ? "rgba(253,250,245,0.4)" : "var(--ky-ink-4)";
  const cardBg = dark ? "rgba(253,250,245,0.06)" : "var(--ky-cream)";
  const cardLine = dark ? "rgba(253,250,245,0.10)" : "var(--ky-cream-line)";

  // Pick the lead screenshot per role
  const heroShot = role === "owner" ? SCREENS.ownerHome
                 : role === "operator" ? SCREENS.operatorHome
                 : SCREENS.roleSelect;

  return (
    <section style={{ position: "relative", padding: "48px 64px 88px", overflow: "hidden", background: bg, color: ink }}>
      {/* Topographical pattern background */}
      <TopoPattern dark={dark}/>

      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 48, alignItems: "center", maxWidth: 1312, margin: "0 auto", minHeight: 720 }}>
        {/* LEFT — copy */}
        <div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 28, flexWrap: "wrap" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "7px 14px",
              borderRadius: "var(--r-pill)",
              background: dark ? "rgba(255,107,0,0.18)" : "var(--ky-saffron-tint)",
              color: dark ? "#FFB174" : "var(--ky-saffron-deep)",
              fontSize: 13, fontWeight: 600, letterSpacing: "0.01em",
            }}>
              <Icon name="globe" size={14}/>
              Live in 10 Indian languages
            </span>
            <span style={{
              fontFamily: "var(--f-display)", fontSize: 14, color: ink3, fontWeight: 600,
            }}>भारत के लिए · Built for Bharat</span>
          </div>

          <h1 style={{
            margin: 0,
            fontFamily: "var(--f-display)",
            fontSize: 84, lineHeight: 0.98, letterSpacing: "-0.025em",
            fontWeight: 800, color: ink, textWrap: "balance",
            maxWidth: 620,
          }}>
            Right equipment,<br/>right farm,<br/>
            <span style={{ color: "var(--ky-saffron)" }}>right time.</span>
          </h1>

          <p style={{ fontSize: 19, lineHeight: 1.55, color: ink2, marginTop: 24, maxWidth: 540, textWrap: "pretty" }}>
            India's marketplace for farm equipment. Farmers book the tractor, harvester or tiller they need by the day or hour. Owners earn from machines that used to sit idle. Operators get paid work running them.
          </p>

          {/* Dual CTA */}
          <div style={{ display: "flex", gap: 12, marginTop: 32, alignItems: "center", flexWrap: "wrap" }}>
            <button style={{
              height: 56, padding: "0 28px",
              background: "var(--ky-saffron)", color: "var(--ky-cream)",
              border: "none", borderRadius: "var(--r-btn)",
              fontFamily: "var(--f-body)", fontSize: 16, fontWeight: 700,
              boxShadow: "0 12px 30px rgba(255,107,0,0.32)",
              display: "inline-flex", alignItems: "center", gap: 10,
              cursor: "pointer",
            }}>
              <Icon name="play" size={16} weight="fill"/>
              Download the app
            </button>
            <button style={{
              height: 56, padding: "0 24px",
              background: "transparent", color: dark ? "#7BD68F" : "var(--ky-forest)",
              border: `1.5px solid ${dark ? "rgba(123,214,143,0.4)" : "var(--ky-forest)"}`,
              borderRadius: "var(--r-btn)",
              fontFamily: "var(--f-body)", fontSize: 16, fontWeight: 700,
              display: "inline-flex", alignItems: "center", gap: 10,
              cursor: "pointer",
            }}>
              <Icon name="plus" size={16}/>
              List your equipment
            </button>
          </div>

          {/* Trust strip */}
          <div style={{ display: "flex", gap: 22, marginTop: 36, flexWrap: "wrap", color: ink3, fontSize: 14, fontWeight: 500 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Icon name="globe" size={16} color="var(--ky-saffron)"/> 10 Indian languages
            </span>
            <span style={{ width: 4, height: 4, borderRadius: 999, background: ink4, alignSelf: "center" }}/>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Icon name="sealCheck" size={16} color="var(--ky-forest)" weight="fill"/> Verified owners
            </span>
            <span style={{ width: 4, height: 4, borderRadius: 999, background: ink4, alignSelf: "center" }}/>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Icon name="wallet" size={16} color={dark ? "#7BD68F" : "var(--ky-forest)"}/> UPI &amp; Cash
            </span>
          </div>
        </div>

        {/* RIGHT — phone + floating UI snippets */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 700 }}>
          {/* halo */}
          <div style={{ position: "absolute", width: 560, height: 560, borderRadius: 999, background: "radial-gradient(circle, rgba(255,107,0,0.22), transparent 70%)", filter: "blur(30px)" }}/>
          {/* main phone tilted ~10° */}
          <div style={{ position: "relative", zIndex: 2, transform: "rotate(-9deg)" }}>
            <ScreenshotPhone src={heroShot} width={300}/>
          </div>

          {/* Floating: Booking accepted */}
          <FloatCard top={36} left={-12} rotate={-4}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: "var(--ky-forest-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="sealCheck" size={20} color="var(--ky-forest)" weight="fill"/>
              </div>
              <div>
                <div style={{ fontFamily: "var(--f-display)", fontWeight: 700, fontSize: 14, color: "var(--ky-ink)" }}>Booking accepted</div>
                <div style={{ fontSize: 12, color: "var(--ky-ink-3)" }}>Hariom Dah · ₹1,500/day</div>
              </div>
            </div>
          </FloatCard>

          {/* Floating: Earnings tile */}
          <FloatCard top={210} right={-30} rotate={5}>
            <div style={{ fontSize: 11, color: "var(--ky-ink-4)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>This month</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 6 }}>
              <span style={{ fontFamily: "var(--f-display)", fontSize: 32, fontWeight: 800, color: "var(--ky-forest)", letterSpacing: "-0.02em" }}>₹42,500</span>
            </div>
            <div style={{ fontSize: 11.5, color: "var(--ky-forest-deep)", fontWeight: 600, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
              <Icon name="arrowRight" size={12} color="var(--ky-forest)"/>
              <span style={{ transform: "rotate(-45deg)", display: "inline-flex" }}>↗</span> +18% vs last month
            </div>
          </FloatCard>

          {/* Floating: Map pin */}
          <FloatCard top={420} left={-30} rotate={-3}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: "var(--ky-saffron-tint)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <Icon name="mapPin" size={20} color="var(--ky-saffron)" weight="fill"/>
                <span style={{ position: "absolute", top: 1, right: 1, width: 8, height: 8, borderRadius: 999, background: "var(--ky-saffron)", border: "2px solid var(--ky-cream)" }}/>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--ky-ink-4)", fontWeight: 600 }}>EN ROUTE TO YOUR FARM</div>
                <div style={{ fontFamily: "var(--f-display)", fontWeight: 700, fontSize: 14, color: "var(--ky-ink)" }}>Equipment 2.4 km away</div>
              </div>
            </div>
          </FloatCard>

          {/* Floating: 4.8 star */}
          <FloatCard top={530} right={-20} rotate={4}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="star" size={18} color="var(--ky-amber)" weight="fill"/>
              <span style={{ fontFamily: "var(--f-display)", fontSize: 22, fontWeight: 800, color: "var(--ky-ink)", letterSpacing: "-0.02em" }}>4.8</span>
              <span style={{ fontSize: 12, color: "var(--ky-ink-3)" }}>· 312 reviews</span>
            </div>
          </FloatCard>

          {/* Floating: Instant booking lightning chip */}
          <FloatCard top={-8} right={20} rotate={6} compact>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="lightning" size={14} color="var(--ky-saffron)" weight="fill"/>
              <span style={{ fontFamily: "var(--f-display)", fontSize: 13, fontWeight: 700, color: "var(--ky-saffron-deep)" }}>Instant book</span>
            </div>
          </FloatCard>
        </div>
      </div>
    </section>
  );
}

function FloatCard({ children, top, left, right, rotate = 0, compact = false }) {
  return (
    <div style={{
      position: "absolute",
      top, left, right,
      padding: compact ? "8px 14px" : "12px 16px",
      background: "var(--ky-cream)",
      borderRadius: compact ? 999 : 14,
      border: "1px solid var(--ky-cream-line)",
      boxShadow: "0 18px 40px rgba(30,26,18,0.10), 0 4px 10px rgba(255,107,0,0.06)",
      transform: `rotate(${rotate}deg)`,
      zIndex: 4,
    }}>
      {children}
    </div>
  );
}

function TopoPattern({ dark }) {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: dark ? 0.18 : 0.12, pointerEvents: "none" }} preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 900">
      <defs>
        <radialGradient id="topoGlow" cx="80%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#FF6B00" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#topoGlow)"/>
      {/* contour rings */}
      {Array.from({ length: 14 }).map((_, i) => {
        const r = 80 + i * 70;
        return <ellipse key={i} cx="1180" cy="180" rx={r * 1.4} ry={r} stroke={dark ? "#FFB174" : "#FF6B00"} strokeWidth="0.7" fill="none" opacity={0.5 - i * 0.03}/>;
      })}
      {Array.from({ length: 9 }).map((_, i) => {
        const r = 60 + i * 50;
        return <ellipse key={i} cx="200" cy="780" rx={r * 1.6} ry={r} stroke={dark ? "#7BD68F" : "#1A7A3B"} strokeWidth="0.7" fill="none" opacity={0.4 - i * 0.03}/>;
      })}
    </svg>
  );
}

// ============================================================
// LANGUAGE MARQUEE — black band with all 10 native scripts
// ============================================================
function LangMarquee() {
  return (
    <div className="lang-marquee" style={{ background: "var(--ky-ink)", color: "var(--ky-cream)", padding: "20px 0", borderTop: "1px solid var(--ky-cream-line)" }}>
      <div className="lang-marquee-track" style={{ display: "flex", gap: 56, whiteSpace: "nowrap", alignItems: "center", fontFamily: "var(--f-display)", fontSize: 22, fontWeight: 600, padding: "0 24px" }}>
        {[...LANG_LIST, ...LANG_LIST].map((l, i) => (
          <React.Fragment key={i}>
            <span>{l.label}</span>
            <span style={{ color: "var(--ky-saffron)", fontSize: 8 }}>●</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// PERSONA SWITCHER — three tabs, each with 3-step flow + screenshot + persona CTA
// ============================================================
function PersonaSwitcher({ role, setRole }) {
  const r = ROLES[role];

  const flows = {
    farmer: {
      title: "Find equipment in 24 hours.",
      titleHi: "अपने खेत के लिए यंत्र खोजें।",
      sub: "Search by type, see what's nearby, book it. No registration required to browse.",
      steps: [
        { i: "globe", t: "Pick your language", d: "Hindi, Tamil, Marathi, Bengali +6. Every screen, every notification translates." },
        { i: "tractor", t: "Find equipment nearby", d: "Browse 30+ equipment types. Filter by HP, distance, hourly or daily rate." },
        { i: "calendar", t: "Book by the day or hour", d: "Pay via UPI or cash on delivery. Track the equipment to your farm." },
      ],
      cta: "Download for farmers",
      ctaIcon: "play",
      screen: SCREENS.postRequest,
      accent: "var(--ky-saffron)",
      accentSoft: "var(--ky-saffron-tint)",
      accentDeep: "var(--ky-saffron-deep)",
    },
    owner: {
      title: "Earn from idle machines.",
      titleHi: "बेकार पड़े यंत्रों से कमाएं।",
      sub: "Owners earn ₹12,000–18,000/day on rented equipment. Free to list, get paid weekly.",
      steps: [
        { i: "plus", t: "List in 2 minutes", d: "Photo + model + hourly rate. Free to list, no subscription, no setup fee." },
        { i: "bell", t: "Receive booking requests", d: "Nearby farmers send requests; you accept or send a counter-offer." },
        { i: "wallet", t: "Get paid weekly", d: "Track per-equipment earnings, payout history and operator assignments." },
      ],
      cta: "List your equipment",
      ctaIcon: "plus",
      screen: SCREENS.ownerHome,
      accent: "var(--ky-forest)",
      accentSoft: "var(--ky-forest-soft)",
      accentDeep: "var(--ky-forest-deep)",
    },
    operator: {
      title: "Steady work, weekly pay.",
      titleHi: "नियमित काम, हर हफ्ते भुगतान।",
      sub: "Skilled drivers find paid assignments running tractors and harvesters near them.",
      steps: [
        { i: "users", t: "Get hired by an owner", d: "Owners assign you to specific equipment in their fleet — visible in your dashboard." },
        { i: "mapPin", t: "Drive the booking", d: "See farm location, route to field, and start booking when you arrive." },
        { i: "rupee", t: "Track every job", d: "Every booking, every hour, every payout — all visible in your earnings tab." },
      ],
      cta: "Join as operator",
      ctaIcon: "arrowRight",
      screen: SCREENS.operatorHome,
      accent: "var(--ky-op-blue)",
      accentSoft: "var(--ky-op-blue-soft)",
      accentDeep: "var(--ky-op-blue-deep)",
    },
  };
  const data = flows[role];

  const isMobile = useIsBelow(900);

  return (
    <section id="personas" style={{ padding: isMobile ? "64px 20px" : "120px 64px", background: "var(--ky-cream)" }}>
      <div style={{ maxWidth: 1312, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 28 : 48 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 999, background: "var(--ky-cream-deep)", border: "1px solid var(--ky-cream-line)", fontSize: 13, fontWeight: 600, color: "var(--ky-ink-2)", letterSpacing: "0.01em" }}>
            <Icon name="users" size={14}/>
            Three sides of the field
          </span>
          <h2 style={{ fontFamily: "var(--f-display)", fontSize: isMobile ? 36 : 56, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "20px auto 16px", fontWeight: 700, maxWidth: 760, textWrap: "balance" }}>
            One marketplace.<br/><span style={{ color: data.accent }}>Pick your side.</span>
          </h2>
          <p style={{ fontSize: isMobile ? 16 : 18, color: "var(--ky-ink-2)", maxWidth: 580, margin: "0 auto", lineHeight: 1.55 }}>
            Farmers rent. Owners earn. Operators get hired. The same app — three different home screens.
          </p>
        </div>

        {isMobile
          ? <PersonaAccordion flows={flows} role={role} setRole={setRole}/>
          : <>
              <PersonaTabs flows={flows} role={role} setRole={setRole}/>
              <PersonaBody data={data} role={role} layout="desktop"/>
            </>
        }
      </div>
    </section>
  );
}

// Pill segmented control — desktop only.
function PersonaTabs({ flows, role, setRole }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 56 }}>
      <div style={{ display: "inline-flex", padding: 6, gap: 4, background: "var(--ky-cream-deep)", borderRadius: "var(--r-pill)", border: "1px solid var(--ky-cream-line)" }}>
        {Object.entries(ROLES).map(([key, p]) => (
          <button key={key} onClick={() => setRole(key)} style={{
            padding: "12px 26px",
            background: role === key ? "var(--ky-cream)" : "transparent",
            color: role === key ? "var(--ky-ink)" : "var(--ky-ink-3)",
            border: "none", borderRadius: 999,
            fontFamily: "var(--f-body)", fontSize: 15, fontWeight: 600,
            boxShadow: role === key ? "0 2px 8px rgba(30,26,18,0.08)" : "none",
            display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
            transition: "all .2s ease",
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: 999,
              background: role === key ? p.accent : "var(--ky-ink-4)",
              boxShadow: role === key ? `0 0 0 4px ${p.accentSoft}` : "none",
            }}/>
            <span>I want to {key === "farmer" ? "rent" : key === "owner" ? "earn" : "operate"}</span>
            <span style={{ fontFamily: "var(--f-display)", fontSize: 13, opacity: 0.55 }}>· {p.hindi}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Accordion — mobile/tablet only. Each row is a roomy header, expand-to-show.
// `role` from parent seeds the initially-open row; toggling also updates parent.
function PersonaAccordion({ flows, role, setRole }) {
  const verbs = { farmer: "rent", owner: "earn", operator: "operate" };
  const [openKey, setOpenKey] = useS(role);
  // Keep accordion in sync if parent role changes (e.g. via deep link)
  useE(() => { setOpenKey(role); }, [role]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {Object.entries(flows).map(([key, data]) => {
        const isOpen = openKey === key;
        const p = ROLES[key];
        return (
          <div key={key} style={{
            border: `1.5px solid ${isOpen ? data.accent : "var(--ky-cream-line)"}`,
            borderRadius: "var(--r-card)",
            background: "var(--ky-cream)",
            overflow: "hidden",
            transition: "border-color .2s ease",
            boxShadow: isOpen ? "0 12px 28px rgba(30,26,18,0.06)" : "none",
          }}>
            <button
              type="button"
              onClick={(e) => {
                // Capture button's viewport position BEFORE the toggle so we can
                // compensate for layout shift afterwards. Without this, closing
                // a previously-open accordion above the tapped one collapses the
                // page upward and the tapped header jumps out of the viewport
                // (the user has to scroll back up to find what they just opened).
                const btn = e.currentTarget;
                const beforeTop = btn.getBoundingClientRect().top;
                const next = isOpen ? null : key;
                setOpenKey(next);
                if (next) setRole(next);
                // After React commits, scroll by the delta so the tapped header
                // stays anchored at the same on-screen position.
                requestAnimationFrame(() => {
                  const afterTop = btn.getBoundingClientRect().top;
                  const delta = afterTop - beforeTop;
                  if (Math.abs(delta) > 1) window.scrollBy(0, delta);
                });
              }}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                padding: "18px 20px",
                background: isOpen ? data.accentSoft : "transparent",
                border: "none",
                display: "flex", alignItems: "center", gap: 14,
                cursor: "pointer",
                textAlign: "left",
                transition: "background .2s ease",
                scrollMarginTop: 80,
              }}
            >
              <span style={{
                width: 36, height: 36, flexShrink: 0,
                borderRadius: 999,
                background: isOpen ? data.accent : "var(--ky-cream-deep)",
                color: isOpen ? "var(--ky-cream)" : data.accent,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name={data.steps[0].i} size={18} color={isOpen ? "var(--ky-cream)" : data.accent} weight={isOpen ? "fill" : "regular"}/>
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--f-display)", fontSize: 17, fontWeight: 700, color: isOpen ? data.accentDeep : "var(--ky-ink)", lineHeight: 1.2 }}>
                  I want to {verbs[key]}
                </div>
                <div style={{ fontSize: 13, color: "var(--ky-ink-3)", marginTop: 2, fontWeight: 500 }}>
                  {p.label} · {p.hindi}
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" style={{
                flexShrink: 0,
                transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                transition: "transform .25s ease",
                color: isOpen ? data.accentDeep : "var(--ky-ink-3)",
              }}>
                <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {isOpen && (
              <div style={{ padding: "20px 20px 28px", borderTop: `1px solid ${data.accentSoft}` }}>
                <PersonaBody data={data} role={key} layout="mobile"/>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Body content shared by desktop tab view and mobile accordion view.
// `layout`: "desktop" → 2-col grid with phone on right.
//           "mobile"  → stacked: tag, title, steps, phone, CTA.
function PersonaBody({ data, role, layout }) {
  const isMobile = layout === "mobile";
  const phone = (
    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: isMobile ? 480 : 720 }}>
      <div style={{ position: "absolute", width: isMobile ? 320 : 540, height: isMobile ? 320 : 540, borderRadius: 999, background: `radial-gradient(circle, ${data.accentSoft}, transparent 70%)` }}/>
      <ScreenshotPhone src={data.screen} width={isMobile ? 260 : 340}/>
    </div>
  );

  const copy = (
    <div>
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "6px 14px",
        borderRadius: 999,
        background: data.accentSoft, color: data.accentDeep,
        fontSize: 13, fontWeight: 700,
        marginBottom: 18,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: data.accent }}/>
        For {ROLES[role].label.toLowerCase()}s · {ROLES[role].hindi}
      </span>
      <h3 style={{ fontFamily: "var(--f-display)", fontSize: isMobile ? 28 : 48, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0, fontWeight: 700, color: "var(--ky-ink)", textWrap: "balance" }}>
        {data.title}
      </h3>
      <div style={{ fontFamily: "var(--f-display)", fontSize: isMobile ? 17 : 22, color: "var(--ky-ink-3)", marginTop: 6, fontWeight: 500 }}>{data.titleHi}</div>
      <p style={{ fontSize: isMobile ? 15.5 : 17.5, color: "var(--ky-ink-2)", lineHeight: 1.6, marginTop: 14, maxWidth: 480 }}>{data.sub}</p>

      <div style={{ marginTop: isMobile ? 20 : 36, display: "grid", gap: 4 }}>
        {data.steps.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 14, padding: isMobile ? "14px 0" : "20px 0", borderTop: i === 0 ? "none" : "1px solid var(--ky-cream-line)" }}>
            <div style={{
              width: isMobile ? 40 : 48, height: isMobile ? 40 : 48, flexShrink: 0,
              borderRadius: 12,
              background: data.accentSoft,
              color: data.accent,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon name={s.i} size={isMobile ? 20 : 24} color={data.accent}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--f-display)", fontSize: isMobile ? 16 : 20, fontWeight: 700, color: "var(--ky-ink)", lineHeight: 1.25 }}>
                <span style={{ color: data.accent, marginRight: 8, fontWeight: 800 }}>0{i+1}</span>
                {s.t}
              </div>
              <div style={{ fontSize: isMobile ? 14 : 15, color: "var(--ky-ink-2)", marginTop: 4, lineHeight: 1.55, maxWidth: 440 }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>

      <button style={{
        marginTop: isMobile ? 24 : 32,
        height: isMobile ? 52 : 56, padding: "0 24px",
        background: data.accent, color: "var(--ky-cream)",
        border: "none", borderRadius: "var(--r-btn)",
        fontFamily: "var(--f-body)", fontSize: isMobile ? 15 : 16, fontWeight: 700,
        boxShadow: `0 12px 30px ${data.accent === "var(--ky-saffron)" ? "rgba(255,107,0,0.32)" : data.accent === "var(--ky-forest)" ? "rgba(26,122,59,0.30)" : "rgba(37,99,235,0.30)"}`,
        display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer",
      }}>
        <Icon name={data.ctaIcon} size={16} weight="fill"/>
        {data.cta}
      </button>
    </div>
  );

  if (isMobile) {
    // Stack: copy first, phone screenshot, then CTA already inside copy.
    // We reorder so the phone sits between sub-paragraph and steps for visual weight.
    return (
      <div>
        {copy}
        <div style={{ marginTop: 24 }}>{phone}</div>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
      {copy}
      {phone}
    </div>
  );
}

// ============================================================
// EQUIPMENT CATEGORIES — scrollable cards
// ============================================================
function EquipmentCategories() {
  const cats = [
    { name: "Tractor", hi: "ट्रैक्टर", color: "#FF6B00", count: 1240, img: "equipment/tractor.png" },
    { name: "Harvester", hi: "हार्वेस्टर", color: "#1A7A3B", count: 480, img: "equipment/harvester.png" },
    { name: "Rotavator", hi: "रोटावेटर", color: "#E25A00", count: 720, img: "equipment/rotavator.png" },
    { name: "Tiller", hi: "टिलर", color: "#1A7A3B", count: 590, img: "equipment/tiller.png" },
    { name: "Seeder", hi: "सीडर", color: "#FF6B00", count: 310, img: "equipment/seeder.png" },
    { name: "Sprayer", hi: "स्प्रेयर", color: "#2563EB", count: 410, img: "equipment/sprayer.png" },
    { name: "Thresher", hi: "थ्रेशर", color: "#1A7A3B", count: 280, img: "equipment/thresher.png" },
    { name: "Cultivator", hi: "कल्टीवेटर", color: "#E25A00", count: 360, img: "equipment/cultivator.png" },
    { name: "Plough", hi: "हल", color: "#FF6B00", count: 510, img: "equipment/plough.png" },
    { name: "Power Tiller", hi: "पावर टिलर", color: "#2563EB", count: 230, img: "equipment/power_tiller.png" },
  ];
  return (
    <section style={{ padding: "100px 0 100px 64px", background: "var(--ky-cream-deep)", borderTop: "1px solid var(--ky-cream-line)" }}>
      <div style={{ maxWidth: 1312, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingRight: 64, marginBottom: 36, gap: 40 }}>
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "var(--ky-cream)", border: "1px solid var(--ky-cream-line)", fontSize: 13, fontWeight: 600, color: "var(--ky-ink-2)" }}>
              <Icon name="tractor" size={14} color="var(--ky-saffron)"/>
              30+ equipment types
            </span>
            <h2 style={{ fontFamily: "var(--f-display)", fontSize: 52, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "16px 0 10px", fontWeight: 700, maxWidth: 720 }}>
              From soil prep to harvest, everything in one place.
            </h2>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 22, color: "var(--ky-ink-3)", fontWeight: 500 }}>मिट्टी से कटाई तक — सब एक जगह</div>
          </div>
            <a href="catalog.html" style={{
              height: 48, padding: "0 22px",
              background: "var(--ky-cream)", color: "var(--ky-ink)",
              border: "1px solid var(--ky-cream-line)", borderRadius: "var(--r-btn)",
              fontFamily: "var(--f-body)", fontSize: 15, fontWeight: 600,
              display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0,
              textDecoration: "none",
            }}>
              Browse all 30+ <Icon name="arrowRight" size={14}/>
            </a>
        </div>

        {/* Horizontal scroller */}
        <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 24, paddingRight: 64, scrollbarWidth: "none" }}>
          {cats.map((c, i) => (
            <EquipmentCard key={i} cat={c}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function EquipmentCard({ cat }) {
  return (
    <div style={{
      flexShrink: 0,
      width: 220, height: 280,
      background: "var(--ky-cream)",
      borderRadius: "var(--r-card)",
      border: "1px solid var(--ky-cream-line)",
      padding: 20,
      display: "flex", flexDirection: "column",
      cursor: "pointer",
      transition: "transform .2s ease",
      boxShadow: "0 2px 8px rgba(255,107,0,0.04)",
    }}>
      {/* equipment illustration */}
      <div style={{
        flex: 1,
        background: `radial-gradient(circle at 50% 60%, ${cat.color}1f, transparent 65%)`,
        borderRadius: 12,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <img src={cat.img} alt={cat.name} style={{
          width: "100%", height: "100%", objectFit: "contain",
          padding: 8,
          filter: "drop-shadow(0 6px 12px rgba(30,26,18,0.15))",
        }}/>
        <div style={{
          position: "absolute", top: 8, right: 8,
          padding: "4px 10px",
          background: "var(--ky-cream)",
          borderRadius: 999,
          fontSize: 11, fontWeight: 700,
          color: "var(--ky-ink-2)",
          fontFamily: "var(--f-mono)",
          boxShadow: "0 1px 3px rgba(30,26,18,0.08)",
        }}>
          {cat.count.toLocaleString("en-IN")}
        </div>
      </div>
      <div style={{ marginTop: 14 }}>
        <div style={{ fontFamily: "var(--f-display)", fontWeight: 700, fontSize: 18, color: "var(--ky-ink)", letterSpacing: "-0.01em" }}>{cat.name}</div>
        <div style={{ fontFamily: "var(--f-display)", fontSize: 14, color: "var(--ky-ink-3)", fontWeight: 500, marginTop: 1 }}>{cat.hi}</div>
      </div>
    </div>
  );
}

// ============================================================
// FEATURE BLOCKS — alternating image/copy with real screenshots
// ============================================================
function Features() {
  const blocks = [
    {
      kicker: "Trust", icon: "sealCheck", color: "var(--ky-forest)",
      title: "Verified owners. Real reviews.",
      titleHi: "सत्यापित मालिक · असली समीक्षाएं",
      desc: "Every owner completes phone, ID and equipment KYC before listing. Bookings are rated by both farmer and owner — only real reviews from real bookings.",
      points: ["Phone + ID + equipment KYC", "Bilateral ratings, no anonymous reviews", "Dispute resolution within 24 hours"],
      screen: SCREENS.ownerListings,
      flip: false,
    },
    {
      kicker: "Tracking", icon: "mapPin", color: "var(--ky-saffron)",
      title: "Watch the tractor coming to your farm.",
      titleHi: "ट्रैक्टर को अपने खेत आता देखें।",
      desc: "Real-time location updates from the moment the owner accepts to when the operator arrives at your field. No more wondering if the equipment is coming.",
      points: ["Live ETA on the booking screen", "Stage-by-stage status: placed → ready → on the way → arrived → working", "Operator phone contact one tap away"],
      screen: SCREENS.farmerTrack,
      flip: true,
    },
    {
      kicker: "Languages", icon: "globe", color: "var(--ky-saffron)",
      title: "10 languages, every screen translated.",
      titleHi: "10 भाषाएं · हर स्क्रीन में",
      desc: "Switch language anytime — the entire app re-skins. Notifications, receipts, even error messages arrive in the language you chose. No half-translated experience.",
      points: ["Hindi, Tamil, Marathi, Bengali, Gujarati", "Kannada, Malayalam, Punjabi, Telugu, English", "Notifications + receipts translated, not just menus"],
      screen: SCREENS.notifications,
      flip: false,
    },
    {
      kicker: "Payments", icon: "wallet", color: "var(--ky-forest)",
      title: "UPI, cash, or both. Your choice.",
      titleHi: "यूपीआई, नकद — आप तय करें।",
      desc: "Owners pick how they receive payment — UPI for instant transfers, QR code for scan-and-pay, or cash with a photo proof workflow that protects both parties.",
      points: ["Instant UPI to any UPI ID", "QR code that works with any payment app", "Cash with mandatory photo receipt for disputes"],
      screen: SCREENS.ownerPayment,
      flip: true,
    },
    {
      kicker: "Cross-state", icon: "shield", color: "var(--ky-amber)",
      title: "Find equipment from neighbouring states.",
      titleHi: "पड़ोसी राज्यों से भी यंत्र खोजें।",
      desc: "When local supply runs short during peak season, browse listings from neighbouring states with clear distance warnings and adjusted delivery quotes.",
      points: ["Cross-state listings clearly flagged", "Distance, fuel and toll estimates upfront", "Negotiate delivery directly with owner"],
      screen: SCREENS.bookings,
      flip: false,
    },
    {
      kicker: "Marketplace", icon: "chat", color: "var(--ky-op-blue)",
      title: "Can't find it? Post a request.",
      titleHi: "नहीं मिला? अनुरोध भेजें।",
      desc: "Tell us what equipment, dates and budget you need. Nearby owners receive the request and send offers. Pick the best one. Free to post.",
      points: ["Post requirement, owners send offers", "Compare price, distance, ratings", "In-app chat scoped to each booking"],
      screen: SCREENS.postRequest,
      flip: true,
    },
  ];
  return (
    <section style={{ padding: "120px 64px", background: "var(--ky-cream)" }}>
      <div style={{ maxWidth: 1312, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "var(--ky-saffron-tint)", color: "var(--ky-saffron-deep)", fontSize: 13, fontWeight: 600 }}>
            <Icon name="sealCheck" size={14} weight="fill"/>
            Why Kisan Sadhan
          </span>
          <h2 style={{ fontFamily: "var(--f-display)", fontSize: 56, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "18px auto 14px", fontWeight: 700, maxWidth: 760, textWrap: "balance" }}>
            Built for how rural India actually works.
          </h2>
          <p style={{ fontSize: 18, color: "var(--ky-ink-2)", maxWidth: 580, margin: "0 auto", lineHeight: 1.55 }}>
            Six features that solve real frictions — not a list of buzzwords from a city office.
          </p>
        </div>

        <div style={{ display: "grid", gap: 96 }}>
          {blocks.map((b, i) => (
            <FeatureBlock key={i} {...b}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureBlock({ kicker, icon, color, title, titleHi, desc, points, screen, flip }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 80,
      alignItems: "center",
      direction: flip ? "rtl" : "ltr",
    }}>
      <div style={{ direction: "ltr" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 14px", borderRadius: 999,
          background: `color-mix(in srgb, ${color} 12%, transparent)`,
          color, fontSize: 13, fontWeight: 700, letterSpacing: "0.02em",
        }}>
          <Icon name={icon} size={14} color={color} weight="fill"/>
          {kicker}
        </span>
        <h3 style={{ fontFamily: "var(--f-display)", fontSize: 44, lineHeight: 1.08, letterSpacing: "-0.025em", margin: "16px 0 6px", fontWeight: 700, color: "var(--ky-ink)", textWrap: "balance", maxWidth: 480 }}>
          {title}
        </h3>
        <div style={{ fontFamily: "var(--f-display)", fontSize: 20, color: "var(--ky-ink-3)", fontWeight: 500 }}>{titleHi}</div>
        <p style={{ fontSize: 17, color: "var(--ky-ink-2)", lineHeight: 1.6, marginTop: 22, maxWidth: 480 }}>{desc}</p>
        <ul style={{ listStyle: "none", padding: 0, margin: "26px 0 0", display: "grid", gap: 10 }}>
          {points.map((p, i) => (
            <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15.5, color: "var(--ky-ink-2)" }}>
              <span style={{
                width: 22, height: 22, flexShrink: 0,
                borderRadius: 999,
                background: `color-mix(in srgb, ${color} 15%, transparent)`,
                color, display: "flex", alignItems: "center", justifyContent: "center",
                marginTop: 1,
              }}>
                <svg width="11" height="11" viewBox="0 0 11 11"><path d="M2 5.5 L4.5 8 L9 3" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <span style={{ lineHeight: 1.5 }}>{p}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Phone */}
      <div style={{ direction: "ltr", display: "flex", justifyContent: "center", position: "relative" }}>
        <div style={{ position: "absolute", width: 480, height: 480, borderRadius: 999, background: `radial-gradient(circle, color-mix(in srgb, ${color} 18%, transparent), transparent 70%)`, filter: "blur(20px)" }}/>
        <ScreenshotPhone src={screen} width={300}/>
      </div>
    </div>
  );
}

// ============================================================
// SOCIAL PROOF — numbers band + testimonial cards
// ============================================================
function SocialProof() {
  const stats = [
    { n: "480+", l: "Equipment listed" },
    { n: "2,400+", l: "Bookings completed" },
    { n: "2", l: "States in pilot" },
    { n: "10", l: "Languages ready" },
  ];
  const quotes = [
    {
      native: "अपनी भाषा में सब साफ़ दिखता है। चार टैप में ट्रैक्टर बुक हो जाता है।",
      en: "Everything is in my language. I book a tractor in four taps.",
      name: "Rajesh Yadav", place: "Sitapur · Uttar Pradesh",
      tag: "Farmer", tagHi: "किसान", accent: "saffron",
    },
    {
      native: "मेरा ट्रैक्टर अब महीने में 25 दिन काम करता है। पहले 7 दिन चलता था।",
      en: "My tractor now works 25 days a month. Earlier it ran 7.",
      name: "Suresh Patil", place: "Ahmednagar · Maharashtra",
      tag: "Owner", tagHi: "मालिक", accent: "forest",
    },
    {
      native: "நிலையான வேலை, வார சம்பளம். இது என் குடும்பத்தை மாற்றியது.",
      en: "Steady work, weekly pay. It changed my family's life.",
      name: "Karthik Ramasamy", place: "Erode · Tamil Nadu",
      tag: "Operator", tagHi: "ஓட்டுநர்", accent: "operator",
    },
  ];
  return (
    <section style={{ background: "var(--ky-cream-deep)" }}>
      {/* Numbers band */}
      <div style={{ background: "var(--ky-forest)", color: "var(--ky-cream)", padding: "60px 64px" }}>
        <div style={{ maxWidth: 1312, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 3fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(253,250,245,0.7)", marginBottom: 10, fontWeight: 700 }}>By the numbers</div>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 32, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Real ground.<br/>Real growth.
            </div>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 17, color: "rgba(253,250,245,0.7)", marginTop: 6, fontWeight: 500 }}>असली ज़मीन · असली प्रगति</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ borderLeft: "2px solid rgba(253,250,245,0.25)", paddingLeft: 22 }}>
                <div style={{ fontFamily: "var(--f-display)", fontSize: 44, fontWeight: 800, letterSpacing: "-0.025em" }}>{s.n}</div>
                <div style={{ fontSize: 14, color: "rgba(253,250,245,0.78)", marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ padding: "100px 64px" }}>
        <div style={{ maxWidth: 1312, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontFamily: "var(--f-display)", fontSize: 48, lineHeight: 1.08, letterSpacing: "-0.025em", margin: "0 auto 12px", fontWeight: 700, maxWidth: 660, textWrap: "balance" }}>
              Voices from the field.
            </h2>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 20, color: "var(--ky-ink-3)", fontWeight: 500 }}>खेत से आवाज़ें</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {quotes.map((q, i) => (
              <TestimonialCard key={i} q={q}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ q }) {
  const accentVar = q.accent === "saffron" ? "var(--ky-saffron)" : q.accent === "forest" ? "var(--ky-forest)" : "var(--ky-op-blue)";
  return (
    <div style={{
      padding: 28,
      background: "var(--ky-cream)",
      borderRadius: "var(--r-card)",
      border: "1px solid var(--ky-cream-line)",
      display: "flex", flexDirection: "column",
      boxShadow: "0 2px 8px rgba(255,107,0,0.04)",
    }}>
      <Pill accent={q.accent} style={{ alignSelf: "flex-start" }}>
        {q.tag} · {q.tagHi}
      </Pill>
      <div style={{
        fontFamily: "var(--f-display)", fontSize: 22, lineHeight: 1.35,
        color: "var(--ky-ink)", marginTop: 18, fontWeight: 500, letterSpacing: "-0.01em",
        textWrap: "pretty",
      }}>
        "{q.native}"
      </div>
      <div style={{ fontSize: 15, color: "var(--ky-ink-3)", marginTop: 14, lineHeight: 1.5, fontStyle: "italic" }}>
        "{q.en}"
      </div>
      <div style={{ flex: 1 }}/>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--ky-cream-line)" }}>
        <div style={{
          width: 44, height: 44, borderRadius: 999,
          background: `linear-gradient(135deg, ${accentVar}, color-mix(in srgb, ${accentVar} 50%, var(--ky-cream-deep)))`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--ky-cream)", fontFamily: "var(--f-display)", fontWeight: 800, fontSize: 17,
        }}>
          {q.name[0]}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ky-ink)" }}>{q.name}</div>
          <div style={{ fontSize: 12.5, color: "var(--ky-ink-3)" }}>{q.place}</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// LANGUAGE SHOWCASE — Hindi screenshot with native scripts floating around
// ============================================================
function LangShowcase() {
  const isMobile = useIsBelow(768);
  const langs = [
    { l: "हिंदी",     t: "Hindi",     color: "var(--ky-saffron)" },
    { l: "ਪੰਜਾਬੀ",   t: "Punjabi",   color: "var(--ky-saffron)" },
    { l: "தமிழ்",     t: "Tamil",     color: "var(--ky-forest)" },
    { l: "বাংলা",    t: "Bengali",   color: "var(--ky-saffron)" },
    { l: "ಕನ್ನಡ",    t: "Kannada",   color: "var(--ky-op-blue)" },
    { l: "English",   t: "English",   color: "var(--ky-forest)" },
    { l: "తెలుగు",   t: "Telugu",    color: "var(--ky-saffron)" },
    { l: "ગુજરાતી",  t: "Gujarati",  color: "var(--ky-forest)" },
    { l: "मराठी",    t: "Marathi",   color: "var(--ky-op-blue)" },
    { l: "മലയാളം",   t: "Malayalam", color: "var(--ky-forest)" },
  ];
  const N = langs.length;
  const phoneWidth   = isMobile ? 200 : 320;
  const haloSize     = isMobile ? 360 : 700;
  const stageHeight  = isMobile ? 480 : 760;

  return (
    <section style={{ padding: isMobile ? "60px 20px" : "120px 64px", background: "var(--ky-cream)", overflow: "hidden" }}>
      <div style={{ maxWidth: 1312, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 28 : 56 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "var(--ky-saffron-tint)", color: "var(--ky-saffron-deep)", fontSize: 13, fontWeight: 700 }}>
            <Icon name="globe" size={14}/>
            10 Indian languages
          </span>
          <h2 style={{ fontFamily: "var(--f-display)", fontSize: isMobile ? 36 : 60, lineHeight: 1.02, letterSpacing: "-0.025em", margin: "20px auto 14px", fontWeight: 800, maxWidth: 820, textWrap: "balance" }}>
            In the language of <span style={{ color: "var(--ky-saffron)" }}>your fields.</span>
          </h2>
          <p style={{ fontSize: isMobile ? 16 : 19, color: "var(--ky-ink-2)", maxWidth: 580, margin: "0 auto", lineHeight: 1.55 }}>
            Switch anytime — every screen, every notification, every receipt.
          </p>
        </div>

        <div className="lang-orbit-stage" style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: stageHeight, padding: "20px 0" }}>
          {/* halo */}
          <div style={{ position: "absolute", width: haloSize, height: haloSize, borderRadius: 999, background: "radial-gradient(circle, rgba(255,107,0,0.18), transparent 65%)", filter: "blur(30px)" }}/>

          {/* phone center — kept at z=0; preserve-3d on the stage handles
              depth ordering so chips pass in front of and behind it. */}
          <div style={{ position: "relative", transformStyle: "preserve-3d" }}>
            <ScreenshotPhone src={SCREENS.roleSelect} width={phoneWidth}/>
          </div>

          {/* Orbiting language chips — even-spaced around phone, continuous rotation */}
          <div className="lang-orbit" aria-hidden="true">
            {langs.map((g, i) => (
              <div
                key={i}
                className="lang-orbit-chip"
                style={{ "--chip-offset": `${(i / N) * 360}deg` }}
              >
                <div style={{
                  padding: isMobile ? "10px 14px" : "14px 18px",
                  background: "var(--ky-cream)",
                  borderRadius: 14,
                  border: "1px solid var(--ky-cream-line)",
                  boxShadow: "0 12px 28px rgba(30,26,18,0.10), 0 2px 6px rgba(255,107,0,0.06)",
                  display: "flex", alignItems: "center", gap: isMobile ? 8 : 10,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: 999, background: g.color,
                    boxShadow: `0 0 0 4px color-mix(in srgb, ${g.color} 18%, transparent)`,
                    flexShrink: 0,
                  }}/>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <div style={{ fontFamily: "var(--f-display)", fontSize: isMobile ? 14 : 18, fontWeight: 700, color: "var(--ky-ink)", lineHeight: 1.4 }}>{g.l}</div>
                    <div style={{ fontSize: isMobile ? 9 : 11, color: "var(--ky-ink-4)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, lineHeight: 1.2 }}>{g.t}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// EARNINGS CALCULATOR — interactive owner conversion tool
// ============================================================
function EarningsCalculator() {
  const [idleDays, setIdleDays] = useS(180);
  const ratePerDay = 1500;
  const yearlyEarnings = idleDays * ratePerDay;
  const monthlyEarnings = Math.round(yearlyEarnings / 12);

  return (
    <section style={{ padding: "120px 64px", background: "var(--ky-forest-night)", color: "var(--ky-cream)", position: "relative", overflow: "hidden" }}>
      {/* texture */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18, pointerEvents: "none" }} preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 900">
        {Array.from({ length: 10 }).map((_, i) => {
          const r = 60 + i * 60;
          return <ellipse key={i} cx="1100" cy="500" rx={r * 1.6} ry={r} stroke="#7BD68F" strokeWidth="0.6" fill="none" opacity={0.5 - i * 0.04}/>;
        })}
      </svg>

      <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "rgba(123,214,143,0.15)", color: "#7BD68F", fontSize: 13, fontWeight: 700 }}>
            <Icon name="rupee" size={14} weight="fill"/>
            For owners
          </span>
          <h2 style={{ fontFamily: "var(--f-display)", fontSize: 54, lineHeight: 1.04, letterSpacing: "-0.025em", margin: "18px 0 10px", fontWeight: 800, textWrap: "balance" }}>
            See what your tractor could earn.
          </h2>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 22, color: "rgba(253,250,245,0.65)", fontWeight: 500 }}>देखें आपका ट्रैक्टर कितना कमा सकता है।</div>
          <p style={{ fontSize: 17.5, color: "rgba(253,250,245,0.75)", lineHeight: 1.6, marginTop: 22, maxWidth: 460 }}>
            A ₹7 lakh tractor that sits idle 200 days a year is a loan, not an asset. Slide to see the difference.
          </p>

          {/* Slider */}
          <div style={{ marginTop: 40, padding: 28, background: "rgba(253,250,245,0.05)", borderRadius: "var(--r-card)", border: "1px solid rgba(253,250,245,0.10)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(253,250,245,0.78)" }}>Days your tractor sits idle</span>
              <span style={{ fontSize: 12, color: "rgba(253,250,245,0.5)" }}>per year</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 18 }}>
              <span style={{ fontFamily: "var(--f-display)", fontSize: 56, fontWeight: 800, color: "var(--ky-saffron)", letterSpacing: "-0.025em" }}>{idleDays}</span>
              <span style={{ fontFamily: "var(--f-display)", fontSize: 18, fontWeight: 600, color: "rgba(253,250,245,0.6)" }}>days</span>
            </div>
            <input
              type="range" min={30} max={300} step={10} value={idleDays}
              onChange={(e) => setIdleDays(parseInt(e.target.value))}
              style={{
                width: "100%",
                accentColor: "#FF6B00",
                height: 6,
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11.5, color: "rgba(253,250,245,0.45)", fontFamily: "var(--f-mono)" }}>
              <span>30</span><span>165</span><span>300</span>
            </div>
          </div>
        </div>

        {/* Result panel */}
        <div style={{ background: "var(--ky-cream)", color: "var(--ky-ink)", borderRadius: "var(--r-card)", padding: 32, boxShadow: "0 30px 60px rgba(0,0,0,0.3)" }}>
          <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ky-ink-3)", fontWeight: 700 }}>Estimated earnings</div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 13, color: "var(--ky-ink-3)", fontWeight: 600 }}>Per month</div>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 56, fontWeight: 800, color: "var(--ky-forest)", letterSpacing: "-0.03em", lineHeight: 1 }}>
              ₹{monthlyEarnings.toLocaleString("en-IN")}
            </div>
          </div>
          <div style={{ marginTop: 22, padding: 18, background: "var(--ky-forest-soft)", borderRadius: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <div style={{ fontSize: 11.5, color: "var(--ky-forest-deep)", fontWeight: 600 }}>Per year</div>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 22, fontWeight: 800, color: "var(--ky-forest-deep)" }}>
                ₹{yearlyEarnings.toLocaleString("en-IN")}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: "var(--ky-forest-deep)", fontWeight: 600 }}>Per booking</div>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 22, fontWeight: 800, color: "var(--ky-forest-deep)" }}>
                ₹{ratePerDay.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 18, fontSize: 12.5, color: "var(--ky-ink-4)", lineHeight: 1.5 }}>
            Assumes ₹{ratePerDay}/day average for tractor rental. Actual earnings depend on equipment type, HP and your region.
          </div>

          <button style={{
            marginTop: 22, height: 52, width: "100%",
            background: "var(--ky-forest)", color: "var(--ky-cream)",
            border: "none", borderRadius: "var(--r-btn)",
            fontFamily: "var(--f-body)", fontSize: 15, fontWeight: 700,
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
            cursor: "pointer",
          }}>
            <Icon name="plus" size={16}/>
            List your equipment — Free
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HOW PAYMENTS WORK — 3 step
// ============================================================
function PaymentsHow() {
  const steps = [
    {
      n: "01", icon: "calendar", color: "var(--ky-saffron)",
      t: "Book the equipment",
      hi: "बुक करें",
      d: "Pick the dates, pick the owner, confirm. The booking is locked once the owner accepts.",
    },
    {
      n: "02", icon: "tractor", color: "var(--ky-forest)",
      t: "Owner delivers, operator works",
      hi: "उपकरण पहुंचाता है",
      d: "Equipment arrives at your farm with a trained operator. You see live tracking until they arrive.",
    },
    {
      n: "03", icon: "wallet", color: "var(--ky-op-blue)",
      t: "Pay via UPI or cash",
      hi: "यूपीआई या नकद",
      d: "Once the work is done, scan the owner's QR or pay cash. A photo proof goes into the booking record.",
    },
  ];
  return (
    <section style={{ padding: "120px 64px", background: "var(--ky-cream-deep)" }}>
      <div style={{ maxWidth: 1312, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "var(--ky-cream)", border: "1px solid var(--ky-cream-line)", fontSize: 13, fontWeight: 600, color: "var(--ky-ink-2)" }}>
            <Icon name="wallet" size={14} color="var(--ky-forest)"/>
            How payments work
          </span>
          <h2 style={{ fontFamily: "var(--f-display)", fontSize: 52, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "18px auto 12px", fontWeight: 700, maxWidth: 720, textWrap: "balance" }}>
            Book → deliver → pay. <span style={{ color: "var(--ky-forest)" }}>Plain and simple.</span>
          </h2>
          <p style={{ fontSize: 18, color: "var(--ky-ink-2)", maxWidth: 580, margin: "0 auto", lineHeight: 1.55 }}>
            We don't hold your money. Payment goes directly between you and the owner — UPI, QR, or cash with photo proof.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, position: "relative" }}>
          {/* connecting line */}
          <div style={{ position: "absolute", top: 56, left: "16%", right: "16%", height: 2, background: "repeating-linear-gradient(90deg, var(--ky-saffron) 0 8px, transparent 8px 16px)", zIndex: 0 }}/>
          {steps.map((s, i) => (
            <div key={i} style={{
              padding: 32,
              background: "var(--ky-cream)",
              borderRadius: "var(--r-card)",
              border: "1px solid var(--ky-cream-line)",
              boxShadow: "0 2px 8px rgba(255,107,0,0.04)",
              position: "relative", zIndex: 1,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: `color-mix(in srgb, ${s.color} 14%, var(--ky-cream))`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
                border: `1px solid color-mix(in srgb, ${s.color} 25%, transparent)`,
              }}>
                <Icon name={s.icon} size={30} color={s.color}/>
              </div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: s.color, fontWeight: 700, letterSpacing: "0.1em" }}>STEP {s.n}</div>
              <h3 style={{ fontFamily: "var(--f-display)", fontSize: 24, fontWeight: 700, color: "var(--ky-ink)", margin: "8px 0 4px", lineHeight: 1.2 }}>{s.t}</h3>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 16, color: "var(--ky-ink-3)", fontWeight: 500 }}>{s.hi}</div>
              <p style={{ fontSize: 15, color: "var(--ky-ink-2)", lineHeight: 1.55, marginTop: 14 }}>{s.d}</p>
            </div>
          ))}
        </div>

        {/* trust footnote */}
        <div style={{ marginTop: 32, padding: "20px 28px", background: "var(--ky-amber-soft)", border: "1px solid color-mix(in srgb, var(--ky-amber) 40%, transparent)", borderRadius: "var(--r-card)", display: "flex", alignItems: "center", gap: 16 }}>
          <Icon name="shield" size={28} color="#92400E" weight="fill"/>
          <div>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 17, fontWeight: 700, color: "#92400E" }}>Cash payments protected</div>
            <div style={{ fontSize: 14, color: "#92400E", marginTop: 2 }}>Every cash payment requires a photo receipt that becomes part of the booking record — used in disputes if needed.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// APP DOWNLOAD BAND — full width with QR
// ============================================================
function DownloadBand() {
  return (
    <section style={{ padding: "100px 64px", background: "linear-gradient(135deg, var(--ky-saffron) 0%, var(--ky-saffron-deep) 60%, #C04E00 100%)", color: "var(--ky-cream)", position: "relative", overflow: "hidden" }}>
      {/* dotted texture */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15, pointerEvents: "none" }} preserveAspectRatio="none" viewBox="0 0 1440 600">
        {Array.from({ length: 100 }).map((_, i) => (
          <circle key={i} cx={(i * 73) % 1440} cy={(i * 119) % 600} r={((i * 7) % 4) + 1} fill="var(--ky-cream)"/>
        ))}
      </svg>

      <div style={{ position: "relative", maxWidth: 1312, margin: "0 auto", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 60, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.9, fontWeight: 700, marginBottom: 14 }}>Available now on Android &amp; iOS</div>
          <h2 style={{ fontFamily: "var(--f-display)", fontSize: 76, lineHeight: 0.98, letterSpacing: "-0.03em", margin: 0, fontWeight: 800, textWrap: "balance" }}>
            Get the app.<br/>Book your first tractor.
          </h2>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 28, marginTop: 14, opacity: 0.88, fontWeight: 500 }}>ऐप डाउनलोड करें · पहला ट्रैक्टर बुक करें</div>

          <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap", alignItems: "center" }}>
            <StoreBadge store="play"/>
            <StoreBadge store="apple"/>
          </div>

          <div style={{ marginTop: 28, fontSize: 14, opacity: 0.85, display: "flex", gap: 22, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="globe" size={14}/> 10 languages</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="shield" size={14}/> Free to install</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="lightning" size={14}/> 12 MB download</span>
          </div>
        </div>

        {/* QR card */}
        <div style={{ background: "var(--ky-cream)", color: "var(--ky-ink)", padding: 24, borderRadius: "var(--r-card)", boxShadow: "0 30px 60px rgba(0,0,0,0.25)" }}>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 20, fontWeight: 700, color: "var(--ky-ink)" }}>On desktop?</div>
          <div style={{ fontSize: 14, color: "var(--ky-ink-3)", marginTop: 4 }}>Scan to install on your phone.</div>
          <div style={{ width: "100%", aspectRatio: "1 / 1", marginTop: 16, padding: 14, background: "var(--ky-cream-deep)", borderRadius: 14 }}>
            <svg viewBox="0 0 60 60" width="100%" height="100%" style={{ display: "block" }}>
              {Array.from({length: 144}).map((_, i) => {
                const x = (i % 12) * 5;
                const y = Math.floor(i / 12) * 5;
                const on = (i * 7919 + i * i * 31) % 100 > 52;
                return on ? <rect key={i} x={x} y={y} width="5" height="5" fill="var(--ky-ink)"/> : null;
              })}
              {/* finder squares */}
              {[[0,0],[45,0],[0,45]].map(([fx,fy],i) => (
                <g key={i}>
                  <rect x={fx} y={fy} width="15" height="15" fill="var(--ky-ink)"/>
                  <rect x={fx+3} y={fy+3} width="9" height="9" fill="var(--ky-cream-deep)"/>
                  <rect x={fx+5} y={fy+5} width="5" height="5" fill="var(--ky-ink)"/>
                </g>
              ))}
              {/* center logo notch */}
              <rect x="22" y="22" width="16" height="16" fill="var(--ky-cream-deep)"/>
              <rect x="24" y="24" width="12" height="12" fill="var(--ky-saffron)"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ — prompt-specific objections
// ============================================================
function FAQ() {
  const faqs = [
    { q: "Is my equipment safe with strangers?", a: "Every farmer who books goes through phone + ID verification. Equipment is GPS-tracked through the booking, photos are taken at handover and return, and damages are documented before payment is released. Repeat damage flags affect a farmer's ability to book." },
    { q: "What if the farmer doesn't pay?", a: "Cash payments require a photo receipt uploaded to the booking before it's marked complete. If payment doesn't go through, the booking stays open and our support team mediates. Farmers with unpaid bookings can't book again until resolved." },
    { q: "Can I cancel a booking?", a: "Yes. Free cancellation up to 24 hours before the booking start. Within 24 hours, a small dispatch fee applies. After the equipment leaves the owner's location, the operator's hourly rate is charged for the time committed." },
    { q: "Which states do you serve?", a: "We're live across Maharashtra, Uttar Pradesh, Karnataka, Tamil Nadu and Punjab — 120+ villages in pilot today. Cross-state listings let you find equipment from neighbouring states with clear distance warnings. Expanding monthly." },
    { q: "Is there a fee to list my equipment?", a: "Free to list. No subscription, no setup fee. We take a 5% commission only when a booking completes — billed weekly to the owner. Free listing means free trial: list for a month, see if it works for you." },
    { q: "What if I don't speak English?", a: "The entire app — every screen, every notification, every receipt — is available in 10 Indian languages. Hindi, Tamil, Marathi, Bengali, Gujarati, Kannada, Malayalam, Punjabi, Telugu, plus English. Switch anytime from settings." },
    { q: "How does dispute resolution work?", a: "From the booking screen, tap Dispute. A support agent reaches out within 24 hours and reviews chat logs, photos and GPS records from both sides. Resolution is binding for both farmer and owner." },
    { q: "Can I assign my own operator to my equipment?", a: "Yes. Owners with multiple machines can hire trained operators through the app — assign them to specific equipment, see their bookings, manage their availability. Operators get steady work, owners get a wider service area." },
  ];
  const [open, setOpen] = useS(0);
  return (
    <section style={{ padding: "120px 64px", background: "var(--ky-cream)" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "var(--ky-cream-deep)", border: "1px solid var(--ky-cream-line)", fontSize: 13, fontWeight: 600, color: "var(--ky-ink-2)" }}>
            <Icon name="chat" size={14}/>
            Common questions
          </span>
          <h2 style={{ fontFamily: "var(--f-display)", fontSize: 48, lineHeight: 1.08, letterSpacing: "-0.025em", margin: "18px auto 12px", fontWeight: 700, maxWidth: 660, textWrap: "balance" }}>
            Honest answers to the things people actually ask.
          </h2>
        </div>
        <div style={{ border: "1px solid var(--ky-cream-line)", borderRadius: "var(--r-card)", background: "var(--ky-cream)", overflow: "hidden", boxShadow: "0 2px 8px rgba(255,107,0,0.04)" }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderTop: i === 0 ? "none" : "1px solid var(--ky-cream-line)" }}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  width: "100%", padding: "22px 28px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: "transparent", border: "none",
                  textAlign: "left", gap: 20, cursor: "pointer",
                }}>
                <span style={{ fontFamily: "var(--f-display)", fontSize: 19, fontWeight: 600, color: "var(--ky-ink)" }}>{f.q}</span>
                <span style={{
                  width: 32, height: 32, borderRadius: 999,
                  background: open === i ? "var(--ky-saffron)" : "var(--ky-cream-deep)",
                  color: open === i ? "var(--ky-cream)" : "var(--ky-ink-2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "transform .25s ease",
                  transform: open === i ? "rotate(45deg)" : "rotate(0)",
                  flexShrink: 0,
                }}>
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                </span>
              </button>
              <div style={{
                maxHeight: open === i ? 280 : 0,
                overflow: "hidden",
                transition: "max-height .35s cubic-bezier(.2,.9,.25,1)",
              }}>
                <div style={{ padding: "0 28px 24px", fontSize: 16, color: "var(--ky-ink-2)", lineHeight: 1.65, maxWidth: 720 }}>
                  {f.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: "20px 26px", background: "var(--ky-cream-deep)", borderRadius: "var(--r-card)", border: "1px solid var(--ky-cream-line)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 17, fontWeight: 700, color: "var(--ky-ink)" }}>Still have questions?</div>
            <div style={{ fontSize: 14, color: "var(--ky-ink-3)", marginTop: 2 }}>Call our helpline — toll-free, 7 AM to 9 PM, in 10 languages.</div>
          </div>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 22, fontWeight: 800, color: "var(--ky-saffron-deep)", letterSpacing: "-0.01em" }}>1800-XXX-YANTRA</div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  const cols = [
    { h: "Product", links: [
      { l: "For Farmers",       href: "farmer.html" },
      { l: "For Owners",        href: "owner.html" },
      { l: "For Operators",     href: "operator.html" },
      { l: "Pricing",           href: "pricing.html" },
      { l: "Download app",      href: "#download" },
    ]},
    { h: "Company", links: [
      { l: "About us",          href: "about.html" },
      { l: "Careers",           href: "mailto:careers@kisansadhan.in" },
      { l: "Press",             href: "mailto:press@kisansadhan.in" },
      { l: "Villages we serve", href: "about.html#coverage" },
    ]},
    { h: "Support", links: [
      { l: "Help center",       href: "contact.html" },
      { l: "Contact us",        href: "contact.html" },
      { l: "Dispute resolution",href: "contact.html#faq" },
      { l: "hello@kisansadhan.in", href: "mailto:hello@kisansadhan.in" },
    ]},
  ];
  return (
    <footer style={{ padding: "80px 64px 40px", background: "var(--ky-ink)", color: "var(--ky-cream)" }}>
      <div style={{ maxWidth: 1312, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(3, 1fr) 1.4fr", gap: 40, paddingBottom: 48, borderBottom: "1px solid rgba(253,250,245,0.12)" }}>
          <div>
            <KYLogo size={32}/>
            <p style={{ fontSize: 14, color: "rgba(253,250,245,0.65)", lineHeight: 1.65, marginTop: 18, maxWidth: 280 }}>
              India's marketplace for renting farm equipment. Built for Bharat — 10 languages, hourly bookings, payments settled directly between farmer and owner.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              {[
                { l: "X",  href: "https://x.com/kisansadhan" },
                { l: "IG", href: "https://instagram.com/kisansadhan" },
                { l: "YT", href: "https://youtube.com/@kisansadhan" },
                { l: "LI", href: "https://linkedin.com/company/kisansadhan" },
              ].map(s => (
                <a key={s.l} href={s.href} style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(253,250,245,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "rgba(253,250,245,0.7)", textDecoration: "none", transition: "background .15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(253,250,245,0.15)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(253,250,245,0.08)"}
                >{s.l}</a>
              ))}
            </div>
            <div style={{ marginTop: 22, padding: 14, background: "rgba(255,107,0,0.08)", borderRadius: 12, border: "1px solid rgba(255,107,0,0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon name="bell" size={18} color="var(--ky-saffron)"/>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(253,250,245,0.7)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>Helpline · 7 AM–9 PM</div>
                  <div style={{ fontFamily: "var(--f-display)", fontSize: 18, fontWeight: 800, color: "var(--ky-saffron)", letterSpacing: "-0.01em" }}>1800-XXX-YANTRA</div>
                </div>
              </div>
            </div>
          </div>
          {cols.map(c => (
            <div key={c.h}>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ky-saffron)", marginBottom: 16 }}>{c.h}</div>
              {c.links.map(l => (
                <a key={l.l} href={l.href} style={{ display: "block", fontSize: 14, color: "rgba(253,250,245,0.72)", marginBottom: 10, textDecoration: "none", transition: "color .15s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "rgba(253,250,245,1)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(253,250,245,0.72)"}
                >{l.l}</a>
              ))}
            </div>
          ))}
          <div>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ky-saffron)", marginBottom: 16 }}>Languages</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 14px" }}>
              {LANG_LIST.map(l => (
                <div key={l.code} style={{ fontFamily: "var(--f-display)", fontSize: 14, color: "rgba(253,250,245,0.72)" }}>{l.label}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, fontSize: 13, color: "rgba(253,250,245,0.5)", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span>© 2025–2026 Kisan Sadhan</span>
            <span style={{ width: 4, height: 4, borderRadius: 999, background: "rgba(253,250,245,0.3)" }}/>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--f-display)", fontWeight: 600 }}>
              <span style={{ display: "inline-block", width: 14, height: 10, background: "linear-gradient(180deg, #FF6B00 0 33%, #FFFFFF 33% 67%, #1A7A3B 67% 100%)", borderRadius: 1.5 }}/>
              Made for Indian farmers
            </span>
          </div>
          <div style={{ display: "flex", gap: 22 }}>
            <a href="privacy.html" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
            <a href="terms.html" style={{ color: "inherit", textDecoration: "none" }}>Terms</a>
            <a href="contact.html" style={{ color: "inherit", textDecoration: "none" }}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// COVERAGE MAP — live states + coming soon
// ============================================================
function CoverageMap() {
  // Pin coordinates are derived from real lat/lng using a linear projection
  // mapped into the SVG viewBox below (60..420 horizontal, 30..510 vertical):
  //   x = 60 + (lng - 68) * 12.4
  //   y = 30 + (37 - lat) * 16.5
  // Reference points: Kashmir top (lat≈37, y≈30), Kanyakumari (lat≈8, y≈510),
  // Gujarat west coast (lng≈68, x≈60), Arunachal east (lng≈97, x≈420).
  const live = [
    { name: "Punjab",        hi: "ਪੰਜਾਬੀ",        villages: 68,  bookings: 4700,  x: 153, y: 129, accent: "var(--ky-forest)"  }, // 31.0°N, 75.5°E
    { name: "Uttar Pradesh", hi: "उत्तर प्रदेश", villages: 310, bookings: 18600, x: 215, y: 195, accent: "var(--ky-forest)"  }, // 27.0°N, 80.5°E
    { name: "Maharashtra",   hi: "महाराष्ट्र",     villages: 280, bookings: 14200, x: 147, y: 319, accent: "var(--ky-saffron)" }, // 19.5°N, 75.5°E
    { name: "Karnataka",     hi: "कर्नाटक",       villages: 96,  bookings: 5800,  x: 156, y: 401, accent: "var(--ky-op-blue)" }, // 14.5°N, 75.7°E
    { name: "Tamil Nadu",    hi: "தமிழ்நாடு",     villages: 88,  bookings: 4900,  x: 190, y: 459, accent: "var(--ky-saffron)" }, // 11.0°N, 78.5°E
  ];
  // Coming-soon states are listed in the chips below (not pinned on the map).
  const soon = [
    { name: "Rajasthan" },
    { name: "Madhya Pradesh" },
    { name: "Bihar" },
    { name: "Gujarat" },
    { name: "Andhra Pradesh" },
  ];
  const [hovered, setHovered] = useS(null);

  return (
    <section style={{ padding: "120px 64px", background: "var(--ky-cream-deep)", borderTop: "1px solid var(--ky-cream-line)" }}>
      <div style={{ maxWidth: 1312, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "var(--ky-forest-soft)", color: "var(--ky-forest-deep)", fontSize: 13, fontWeight: 700 }}>
            <Icon name="mapPin" size={14} color="var(--ky-forest)" weight="fill"/>
            Coverage · उपलब्धता
          </span>
          <h2 style={{ fontFamily: "var(--f-display)", fontSize: 54, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "18px auto 12px", fontWeight: 700, maxWidth: 760, textWrap: "balance" }}>
            5 states. 120+ villages in pilot.<br/><span style={{ color: "var(--ky-forest)" }}>Growing every month.</span>
          </h2>
          <p style={{ fontSize: 18, color: "var(--ky-ink-2)", maxWidth: 560, margin: "0 auto", lineHeight: 1.55 }}>
            Live across Maharashtra, UP, Karnataka, Tamil Nadu and Punjab — with Rajasthan, MP, Bihar and Gujarat coming by monsoon 2026.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 64, alignItems: "start" }}>
          {/* LEFT — state cards */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ky-ink-4)", marginBottom: 14 }}>Live now · अभी उपलब्ध</div>
            <div style={{ display: "grid", gap: 10 }}>
              {live.map((s, i) => (
                <div key={i}
                  onMouseEnter={() => setHovered(s.name)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    padding: "16px 20px",
                    background: hovered === s.name ? "var(--ky-cream)" : "var(--ky-cream)",
                    border: `1px solid ${hovered === s.name ? s.accent : "var(--ky-cream-line)"}`,
                    borderRadius: "var(--r-card)",
                    display: "flex", alignItems: "center", gap: 16,
                    transition: "border-color .2s ease",
                    cursor: "default",
                    boxShadow: hovered === s.name ? "var(--sh-md)" : "none",
                  }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: 999, flexShrink: 0,
                    background: s.accent,
                    boxShadow: `0 0 0 5px color-mix(in srgb, ${s.accent} 18%, transparent)`,
                  }}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontFamily: "var(--f-display)", fontSize: 18, fontWeight: 700, color: "var(--ky-ink)" }}>{s.name}</span>
                      <span style={{ fontFamily: "var(--f-display)", fontSize: 14, fontWeight: 500, color: "var(--ky-ink-3)" }}>{s.hi}</span>
                    </div>
                    <div style={{ display: "flex", gap: 18, marginTop: 6, fontSize: 13, color: "var(--ky-ink-3)" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                        <Icon name="mapPin" size={12} color={s.accent} weight="fill"/>
                        {s.villages} villages
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                        <Icon name="calendar" size={12} color={s.accent}/>
                        {s.bookings.toLocaleString("en-IN")} bookings
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ky-ink-4)", marginBottom: 14, marginTop: 28 }}>Coming soon · जल्द आ रहा है</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {soon.map((s, i) => (
                <span key={i} style={{
                  padding: "8px 16px", borderRadius: 999,
                  border: "1px dashed var(--ky-cream-line)",
                  background: "var(--ky-cream)",
                  fontSize: 13.5, fontWeight: 600, color: "var(--ky-ink-3)",
                  display: "inline-flex", alignItems: "center", gap: 6,
                }}>
                  <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="none" stroke="var(--ky-ink-4)" strokeWidth="1.2" strokeDasharray="2 2"/></svg>
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — India map with live pins only */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <svg viewBox="0 0 480 540" style={{ width: "100%", maxWidth: 480, filter: "drop-shadow(0 20px 40px rgba(30,26,18,0.08))" }}>
              {/*
                India outline — simplified but geographically accurate.
                Traced clockwise from Kashmir → NE finger → Bangladesh notch →
                East coast → Kanyakumari → West coast → Kutch → Pakistan border.
              */}
              <path
                d="
                  M 165 28
                  L 195 22 L 225 26 L 252 32 L 278 42 L 298 58 L 312 78
                  L 305 96 L 318 108 L 340 110 L 358 102 L 380 100
                  L 402 108 L 420 122 L 412 138 L 390 138 L 372 130
                  L 360 142 L 348 158 L 332 162 L 318 178 L 322 198
                  L 340 208 L 348 226 L 342 248 L 332 270 L 322 292
                  L 308 314 L 290 336 L 270 360 L 252 384 L 232 408
                  L 218 432 L 206 460 L 198 488 L 192 510 L 188 522
                  L 182 524 L 178 514 L 172 492 L 162 462 L 152 432
                  L 144 402 L 138 372 L 134 342 L 132 312 L 138 286
                  L 130 262 L 118 240 L 110 220 L 104 200 L 98 188
                  L 88 196 L 78 210 L 64 218 L 56 212 L 60 198
                  L 72 188 L 86 178 L 96 162 L 90 144 L 82 132
                  L 88 118 L 102 110 L 110 94 L 108 78 L 116 62
                  L 132 48 L 148 38 Z
                "
                fill="var(--ky-cream)"
                stroke="var(--ky-cream-line)"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />

              {/* Live state pins — supported states only */}
              {live.map((s, i) => {
                const color = s.accent
                  .replace("var(--ky-saffron)", "#FF6B00")
                  .replace("var(--ky-forest)", "#1A7A3B")
                  .replace("var(--ky-op-blue)", "#2563EB");
                const isHov = hovered === s.name;
                // Push the label outward from the state centroid; right side
                // for east-of-center states, left for west, so labels never
                // collide with the coastline.
                const labelLeft = s.x < 200;
                return (
                  <g key={i}>
                    <circle cx={s.x} cy={s.y} r={isHov ? 30 : 24} fill={color} opacity="0.10"/>
                    <circle cx={s.x} cy={s.y} r={isHov ? 18 : 14} fill={color} opacity="0.20"/>
                    <circle cx={s.x} cy={s.y} r="7" fill={color}/>
                    <circle cx={s.x} cy={s.y} r="3.2" fill="white" opacity="0.95"/>
                    <text
                      x={s.x + (labelLeft ? -14 : 14)}
                      y={s.y + 4}
                      textAnchor={labelLeft ? "end" : "start"}
                      fontFamily="DM Sans, sans-serif"
                      fontSize="11"
                      fontWeight="700"
                      fill="#1E1A12"
                      style={{ pointerEvents: "none" }}
                    >{s.name}</text>
                  </g>
                );
              })}
            </svg>

            {/* stat pill */}
            <div style={{
              position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
              padding: "12px 20px",
              background: "var(--ky-ink)", color: "var(--ky-cream)",
              borderRadius: 999,
              display: "flex", alignItems: "center", gap: 10,
              fontSize: 13, fontWeight: 600,
              whiteSpace: "nowrap",
              boxShadow: "var(--sh-lg)",
            }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--ky-forest)" }}/>
              5 states live · 120+ villages
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  Hero, LangMarquee, PersonaSwitcher, EquipmentCategories, Features,
  SocialProof, LangShowcase, EarningsCalculator, PaymentsHow,
  DownloadBand, FAQ, Footer, CoverageMap,
});
