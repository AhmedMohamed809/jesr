import { useState } from "react";
import {
  AreaChart, Area, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis,
} from "recharts";
import {
  Megaphone, Activity, BadgeCheck, CircleDollarSign, Wallet,
  MousePointerClick, Target, Link2, Copy, Check,
} from "lucide-react";
import { C } from "../theme";
import { POOL } from "../data";
import { fmt, money } from "../engine";
import { Stat } from "./ui";

function makeSeries(base) {
  return Array.from({ length: 14 }, (_, i) => ({
    d: i + 1,
    clicks: Math.max(2, Math.round(base * (0.5 + Math.sin(i / 2) * 0.25 + Math.random() * 0.4))),
  }));
}
function rndCode() {
  const s = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => s[Math.floor(Math.random() * s.length)]).join("");
}

export default function InfluencerDash({ t, lang }) {
  const me = POOL[0]; // Layan — demo persona
  const [avail, setAvail] = useState(true);
  const [offers, setOffers] = useState([
    { id: "o1", brand: lang === "ar" ? "عطور نَوّار" : "Nawwar Perfumes", cat: "beauty", budget: 5200, reach: "1.5M", state: null },
    { id: "o2", brand: lang === "ar" ? "تطبيق فِطَر" : "Fitar App", cat: "food", budget: 3400, reach: "900K", state: null },
    { id: "o3", brand: lang === "ar" ? "أزياء لِين" : "Leen Fashion", cat: "fashion", budget: 4400, reach: "1.1M", state: null },
  ]);
  const [active] = useState([
    { id: "a1", brand: lang === "ar" ? "مستحضرات جلو" : "Glow Cosmetics", code: rndCode(), clicks: 8420, conv: 196, earn: 5200, series: makeSeries(620) },
    { id: "a2", brand: lang === "ar" ? "ساعات زمَن" : "Zaman Watches", code: rndCode(), clicks: 5130, conv: 88, earn: 4400, series: makeSeries(380) },
  ]);
  const setOffer = (id, state) => setOffers((o) => o.map((x) => (x.id === id ? { ...x, state } : x)));

  const totalEarn = active.reduce((a, x) => a + x.earn, 0);
  const pending = Math.round(totalEarn * 0.35);

  return (
    <main className="j-wrap j-fade">
      <div className="j-profilebar">
        <div className="j-ava lg" style={{ background: me.color + "22", color: me.color, borderColor: me.color + "55" }}>LA</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 18, fontFamily: "'Readex Pro',sans-serif" }}>{me[lang]}</span>
            <BadgeCheck size={17} color={C.mint} />
            <span className="j-demo">{t.demoBadge}</span>
          </div>
          <div style={{ color: C.muted, fontSize: 13 }}>{me.handle} · {fmt(me.followers)} {t.followers} · {t.cats[me.category]}</div>
        </div>
        <button className={"j-avail" + (avail ? " on" : "")} onClick={() => setAvail((a) => !a)}>
          <span className="j-avail-dot" /> {avail ? t.available : t.busy}
        </button>
      </div>

      <div className="j-roi-grid" style={{ marginBottom: 26 }}>
        <Stat icon={CircleDollarSign} label={t.earnings} value={money(totalEarn)} accent={C.mint} sub={t.thisMonth} />
        <Stat icon={Wallet} label={t.pending} value={money(pending)} accent={C.gold} />
        <Stat icon={MousePointerClick} label={t.clicks} value={fmt(active.reduce((a, x) => a + x.clicks, 0))} accent={C.coral} />
        <Stat icon={Target} label={t.conversions} value={fmt(active.reduce((a, x) => a + x.conv, 0))} accent={C.violet} />
      </div>

      <div className="j-dash-cols">
        <div>
          <h3 className="j-h3"><Megaphone size={17} color={C.coral} /> {t.offers}</h3>
          {offers.every((o) => o.state === "declined") && <div className="j-empty">{t.noOffers}</div>}
          {offers.map((o) => o.state !== "declined" && (
            <div key={o.id} className="j-offer">
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{o.brand}</div>
                <div style={{ color: C.muted, fontSize: 12.5, marginTop: 3 }}>{t.cats[o.cat]} · {t.fReach}: {o.reach}</div>
                <div style={{ color: C.mint, fontWeight: 700, fontSize: 14, marginTop: 6, fontFamily: "'IBM Plex Mono',monospace" }}>
                  {t.budget}: {money(o.budget)}
                </div>
              </div>
              {o.state === "accepted" ? (
                <span className="j-accepted">{t.accepted}</span>
              ) : (
                <div className="j-offer-btns">
                  <button className="j-accept" onClick={() => setOffer(o.id, "accepted")}>{t.accept}</button>
                  <button className="j-decline" onClick={() => setOffer(o.id, "declined")}>{t.decline}</button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div>
          <h3 className="j-h3"><Activity size={17} color={C.mint} /> {t.active}</h3>
          {active.map((a) => <ActiveCampaign key={a.id} a={a} t={t} />)}
        </div>
      </div>
    </main>
  );
}

function ActiveCampaign({ a, t }) {
  const [copied, setCopied] = useState(false);
  const link = `jisr.link/c/${a.code}`;
  const copy = async () => {
    try { await navigator.clipboard.writeText("https://" + link); } catch { /* clipboard blocked */ }
    setCopied(true); setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="j-active">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontWeight: 700, fontSize: 15 }}>{a.brand}</span>
        <span style={{ color: C.mint, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace" }}>{money(a.earn)}</span>
      </div>

      <div className="j-label" style={{ marginBottom: 6 }}><Link2 size={13} color={C.coral} /> {t.yourLink}</div>
      <div className="j-link">
        <code>{link}</code>
        <button className="j-copy" onClick={copy}>{copied ? <Check size={14} /> : <Copy size={14} />} {copied ? t.copied : t.copy}</button>
      </div>

      <div className="j-active-stats">
        <span><b>{fmt(a.clicks)}</b> {t.clicks}</span>
        <span><b>{fmt(a.conv)}</b> {t.conversions}</span>
      </div>

      <div style={{ color: C.muted, fontSize: 11.5, marginTop: 10, marginBottom: 2 }}>{t.last14}</div>
      <div style={{ height: 64, direction: "ltr" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={a.series} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
            <defs>
              <linearGradient id={`g${a.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.coral} stopOpacity={0.5} />
                <stop offset="100%" stopColor={C.coral} stopOpacity={0} />
              </linearGradient>
            </defs>
            <RTooltip contentStyle={{ background: C.ink3, border: `1px solid ${C.line2}`, borderRadius: 8, fontSize: 12, color: C.text }}
              labelFormatter={() => ""} formatter={(v) => [v, t.clicks]} />
            <Area type="monotone" dataKey="clicks" stroke={C.coral} strokeWidth={2} fill={`url(#g${a.id})`} />
            <XAxis dataKey="d" hide /><YAxis hide />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
