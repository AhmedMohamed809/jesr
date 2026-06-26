import { Building2, Megaphone, Sparkles, Star, ArrowRight, BadgeCheck, ShieldCheck } from "lucide-react";
import { C } from "../theme";

export default function Home({ t, lang, setView }) {
  return (
    <main className="j-wrap">
      <section className="j-hero">
        <div className="j-hero-copy j-fade">
          <div className="j-eyebrow"><Sparkles size={14} color={C.coral} /> {t.poweredAI}</div>
          <h1 className="j-h1">{t.heroTitle}</h1>
          <p className="j-sub">{t.heroSub}</p>
          <div className="j-trust">
            <span><BadgeCheck size={15} color={C.mint} /> {t.trustedReach}</span>
            <span><ShieldCheck size={15} color={C.mint} /> {t.commissionFree}</span>
          </div>
        </div>
        <HeroBridge />
      </section>

      <section className="j-roles">
        <RoleCard icon={Building2} accent={C.coral} title={t.iAmCompany} desc={t.iAmCompanyDesc} cta={t.enter} onClick={() => setView("company")} />
        <RoleCard icon={Megaphone} accent={C.mint} title={t.iAmInfluencer} desc={t.iAmInfluencerDesc} cta={t.enter} onClick={() => setView("influencer")} />
      </section>
    </main>
  );
}

function RoleCard({ icon: Icon, title, desc, cta, accent, onClick }) {
  return (
    <button className="j-role" onClick={onClick}>
      <div className="j-role-ic" style={{ background: accent + "1A", color: accent, borderColor: accent + "55" }}>
        <Icon size={26} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 19, fontWeight: 700, fontFamily: "'Readex Pro',sans-serif" }}>{title}</div>
        <div style={{ color: C.muted, fontSize: 13.5, marginTop: 4 }}>{desc}</div>
      </div>
      <span className="j-role-cta" style={{ color: accent }}>{cta} <ArrowRight size={16} className="j-rtl-flip" /></span>
    </button>
  );
}

function HeroBridge() {
  return (
    <div className="j-hero-art" aria-hidden>
      <svg viewBox="0 0 420 320" width="100%" height="100%">
        <defs>
          <linearGradient id="arc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={C.coral} /><stop offset="1" stopColor={C.violet} />
          </linearGradient>
        </defs>
        <g className="j-node">
          <circle cx="60" cy="160" r="30" fill={C.ink2} stroke={C.coral} strokeWidth="2.5" />
          <foreignObject x="44" y="144" width="32" height="32">
            <div style={{ display: "grid", placeItems: "center", height: 32, color: C.coral }}><Building2 size={20} /></div>
          </foreignObject>
        </g>
        {[{ y: 60 }, { y: 160 }, { y: 260 }].map((p, i) => (
          <g key={i}>
            <path d={`M 90 160 C 200 160, 240 ${p.y}, 350 ${p.y}`} fill="none" stroke="url(#arc)" strokeWidth="2.4"
              strokeDasharray="380" strokeDashoffset="380" className="j-draw" style={{ animationDelay: `${0.3 + i * 0.25}s` }} />
            <circle cx="350" cy={p.y} r="22" fill={C.ink2} stroke={C.mint} strokeWidth="2" className="j-node" style={{ animationDelay: `${0.6 + i * 0.25}s` }} />
            <foreignObject x="338" y={p.y - 12} width="24" height="24">
              <div style={{ display: "grid", placeItems: "center", height: 24, color: C.mint }}><Star size={13} fill={C.mint} /></div>
            </foreignObject>
          </g>
        ))}
      </svg>
    </div>
  );
}
