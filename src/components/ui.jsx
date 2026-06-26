import { C } from "../theme";

export function Logo({ lang, size = 30 }) {
  const brand = lang === "ar" ? "جسر" : "Jisr";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
        <path d="M4 28 C 12 8, 28 8, 36 28" stroke={C.coral} strokeWidth="3" strokeLinecap="round" />
        <line x1="4" y1="28" x2="4" y2="34" stroke={C.coral} strokeWidth="3" strokeLinecap="round" />
        <line x1="36" y1="28" x2="36" y2="34" stroke={C.coral} strokeWidth="3" strokeLinecap="round" />
        <circle cx="20" cy="13.5" r="3.6" fill={C.mint} />
        <line x1="14" y1="20" x2="14" y2="28" stroke={C.line2} strokeWidth="2" />
        <line x1="26" y1="20" x2="26" y2="28" stroke={C.line2} strokeWidth="2" />
      </svg>
      <span style={{ fontFamily: "'Readex Pro', sans-serif", fontWeight: 700, fontSize: size * 0.62, color: C.text, letterSpacing: lang === "en" ? "-0.5px" : 0 }}>
        {brand}
      </span>
    </div>
  );
}

export function Stat({ icon: Icon, label, value, accent = C.mint, sub }) {
  return (
    <div className="j-stat">
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.muted, fontSize: 12.5, fontWeight: 600 }}>
        <Icon size={15} color={accent} /> {label}
      </div>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 26, fontWeight: 700, color: C.text, marginTop: 6, lineHeight: 1 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 11.5, color: C.muted, marginTop: 5 }}>{sub}</div>}
    </div>
  );
}

export function Gauge({ value }) {
  const r = 34, circ = 2 * Math.PI * r, off = circ * (1 - value / 100);
  return (
    <div style={{ position: "relative", width: 92, height: 92, flexShrink: 0 }}>
      <svg width="92" height="92" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="46" cy="46" r={r} stroke={C.line} strokeWidth="8" fill="none" />
        <circle cx="46" cy="46" r={r} stroke={C.mint} strokeWidth="8" fill="none"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={off}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.2,.8,.2,1)" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 22, color: C.text }}>
          {value}<span style={{ fontSize: 12, color: C.muted }}>%</span>
        </span>
      </div>
    </div>
  );
}

export function Footer({ t, lang }) {
  return (
    <footer className="j-footer">
      <Logo lang={lang} size={22} />
      <span style={{ color: C.muted, fontSize: 12.5 }}>{t.tagline} · {new Date().getFullYear()}</span>
    </footer>
  );
}
