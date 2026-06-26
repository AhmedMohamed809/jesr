import {
  Sparkles, Users, Eye, MousePointerClick, Target, TrendingUp, Wallet,
  Crown, Flame, Send, Check, X, BadgeCheck,
} from "lucide-react";
import { C } from "../theme";
import { REGION_AR, REGION_EN } from "../data";
import { fmt, money } from "../engine";
import { Stat, Gauge } from "./ui";

export default function Results({ t, lang, data, brief, onEdit }) {
  const { ranked, strat } = data;
  const sel = ranked.filter((r) => r.inBudget);
  const use = sel.length ? sel : ranked;
  const tot = use.reduce(
    (a, r) => ({
      reach: a.reach + r.proj.reach, views: a.views + r.proj.views, clicks: a.clicks + r.proj.clicks,
      conv: a.conv + r.proj.conversions, rev: a.rev + r.proj.revenue, cost: a.cost + r.proj.cost,
    }),
    { reach: 0, views: 0, clicks: 0, conv: 0, rev: 0, cost: 0 }
  );
  const conf = Math.round(use.reduce((a, r) => a + r.score, 0) / use.length);
  const fee = Math.round(tot.cost * 0.15);
  const roi = tot.cost ? tot.rev / tot.cost : 0;

  return (
    <main className="j-wrap j-fade">
      <div className="j-res-head">
        <div>
          <div className="j-eyebrow"><Sparkles size={14} color={C.coral} /> {t.aiStrategy}</div>
          <h2 className="j-h2" style={{ marginTop: 6 }}>{strat[`headline_${lang}`] || t.resTitle}</h2>
          <p className="j-sub2" style={{ maxWidth: 620 }}>{strat[`summary_${lang}`]}</p>
        </div>
        <button className="j-pill" onClick={onEdit}>{t.editBrief}</button>
      </div>

      <div className="j-roi">
        <div className="j-roi-main">
          <Gauge value={conf} />
          <div>
            <div style={{ color: C.muted, fontSize: 12.5, fontWeight: 600 }}>{t.confidence}</div>
            <div className="j-roi-big">
              {roi.toFixed(1)}<span style={{ fontSize: 20, color: C.mint }}>×</span>
              <span className="j-roi-tag">{t.roi}</span>
            </div>
            <div style={{ color: C.muted, fontSize: 11.5, marginTop: 4 }}>{t.revenueNote}</div>
          </div>
        </div>
        <div className="j-roi-grid">
          <Stat icon={Users} label={t.estReach} value={fmt(tot.reach)} accent={C.violet} />
          <Stat icon={Eye} label={t.estViews} value={fmt(tot.views)} accent={C.mint} />
          <Stat icon={MousePointerClick} label={t.estClicks} value={fmt(tot.clicks)} accent={C.coral} />
          <Stat icon={Target} label={t.estConv} value={fmt(tot.conv)} accent={C.gold} />
          <Stat icon={TrendingUp} label={t.estRevenue} value={money(tot.rev)} accent={C.mint} />
          <Stat icon={Wallet} label={t.yourSpend} value={money(tot.cost)} accent={C.coral} sub={`${t.platformFee}: ${money(fee)}`} />
        </div>
      </div>

      <h3 className="j-h3"><Crown size={18} color={C.gold} /> {t.topPicks}</h3>
      <div className="j-cards">
        {ranked.map((r, i) => <CreatorCard key={r.inf.id} r={r} rank={i + 1} t={t} lang={lang} />)}
      </div>

      <div className="j-card j-risk">
        <div className="j-label" style={{ marginBottom: 6 }}><Flame size={14} color={C.coral} /> {t.risks}</div>
        <div style={{ color: C.muted, fontSize: 13.5, lineHeight: 1.7 }}>{strat[`risks_${lang}`]}</div>
      </div>

      <button className="j-cta j-cta-lg"><Send size={18} /> {t.launch}</button>
    </main>
  );
}

function CreatorCard({ r, rank, t, lang }) {
  const { inf, proj, score } = r;
  const name = inf[lang];
  const initials = inf.en.split(" ").map((w) => w[0]).join("").slice(0, 2);
  const regionName = (lang === "ar" ? REGION_AR : REGION_EN)[inf.region];
  return (
    <div className="j-creator">
      <div className="j-creator-top">
        <div className="j-rank">{rank}</div>
        <div className="j-ava" style={{ background: inf.color + "22", color: inf.color, borderColor: inf.color + "55" }}>{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 15.5 }}>{name}</span>
            <BadgeCheck size={15} color={C.mint} />
          </div>
          <div style={{ color: C.muted, fontSize: 12.5 }}>{inf.handle} · {t.cats[inf.category]} · {regionName}</div>
        </div>
        <div className="j-matchbox">
          <div className="j-match-n">{score}<span style={{ fontSize: 11 }}>%</span></div>
          <div className="j-match-l">{t.match}</div>
        </div>
      </div>

      <div className="j-bar"><span style={{ width: score + "%" }} /></div>

      <div className="j-creator-stats">
        <div><b>{fmt(inf.followers)}</b><span>{t.followers}</span></div>
        <div><b>{fmt(inf.avgViews)}</b><span>{t.avgViews}</span></div>
        <div><b>{inf.engagement}%</b><span>{t.engagement}</span></div>
        <div><b>{money(inf.price)}</b><span>{t.perPost}</span></div>
      </div>

      <div className="j-proj">
        <span><Eye size={13} color={C.mint} /> {fmt(proj.views)}</span>
        <span><MousePointerClick size={13} color={C.coral} /> {fmt(proj.clicks)}</span>
        <span><Target size={13} color={C.gold} /> {fmt(proj.conversions)}</span>
        <span className={"j-budgetflag" + (r.inBudget ? " ok" : " over")}>
          {r.inBudget ? <Check size={12} /> : <X size={12} />} {r.inBudget ? t.inBudget : t.overBudget}
        </span>
      </div>

      {r.why?.[lang] && (
        <div className="j-why"><span className="j-why-l">{t.whyThis}</span> {r.why[lang]}</div>
      )}
    </div>
  );
}
