// Matching + projection engine, plus the AI strategy call (with a local fallback
// so the app works fully even when no AI backend is configured).
import { ADJ, CAT_AOV, REGION_KEYS, REGION_EN, REGION_AR } from "./data";
import { STR } from "./i18n";

export function scoreInfluencer(inf, brief) {
  const cat = inf.category === brief.category ? 1 : (ADJ[brief.category]?.includes(inf.category) ? 0.55 : 0.25);
  const regs = brief.regions.length ? brief.regions : REGION_KEYS;
  const regHit = regs.includes(inf.region) ? 1 : (inf.reach.some((r) => regs.includes(r)) ? 0.62 : 0.3);
  let aud = 0.72;
  if (brief.gender && brief.gender !== "all") aud = inf.audGender === brief.gender ? 1 : (inf.audGender === "all" ? 0.78 : 0.48);
  else if (inf.audGender === "all") aud = 0.9;
  const eng = Math.min(1, inf.engagement / 8.5);
  const raw = cat * 0.4 + regHit * 0.25 + aud * 0.15 + eng * 0.2;
  return Math.round(Math.min(0.98, raw) * 100);
}

export function projectFor(inf, brief, score) {
  const factor = 0.62 + (score / 100) * 0.6;
  const views = Math.round(inf.avgViews * factor);
  const reach = Math.round(views * 1.55);
  const ctr = (1.1 + inf.engagement * 0.26) / 100;
  const clicks = Math.round(views * ctr);
  const convRate = brief.goal === "sales" ? 0.034 : brief.goal === "installs" ? 0.06 : 0.018;
  const conversions = Math.round(clicks * convRate);
  const aov = Number(brief.aov) > 0 ? Number(brief.aov) : (CAT_AOV[brief.category] || 40);
  const revenue = Math.round(conversions * aov);
  return { views, reach, clicks, conversions, revenue, cost: inf.price };
}

export function rankCreators(pool, brief, limit = 5) {
  const ranked = pool
    .map((inf) => {
      const score = scoreInfluencer(inf, brief);
      return { inf, score, proj: projectFor(inf, brief, score) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  let spent = 0;
  ranked.forEach((r) => {
    r.inBudget = spent + r.proj.cost <= Number(brief.budget);
    if (r.inBudget) spent += r.proj.cost;
  });
  return ranked;
}

export function fmt(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, "") + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(n >= 1e5 ? 0 : 1).replace(/\.0$/, "") + "K";
  return String(n);
}
export function money(n) { return "$" + Math.round(n).toLocaleString("en-US"); }

// Calls the backend proxy (/api/strategy) which holds the Anthropic key server-side.
// Throws on any failure so the caller can fall back to the local engine.
export async function getAIStrategy(brief, ranked, lang) {
  const compact = ranked.map((r) => ({
    name: r.inf.en, niche: r.inf.category, region: REGION_EN[r.inf.region],
    followers: r.inf.followers, score: r.score,
    projViews: r.proj.views, projClicks: r.proj.clicks, projConv: r.proj.conversions,
  }));
  const payload = {
    lang,
    brief: {
      product: brief.product, category: brief.category, description: brief.desc,
      regions: brief.regions.map((r) => REGION_EN[r]), gender: brief.gender,
      goal: brief.goal, metric: brief.metric, target: brief.target, budget: brief.budget,
    },
    creators: compact,
  };
  const res = await fetch("/api/strategy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("strategy endpoint " + res.status);
  const data = await res.json();
  if (!data || !Array.isArray(data.creators)) throw new Error("bad strategy payload");
  return data;
}

export function fallbackStrategy(brief, ranked, lang) {
  const creators = ranked.map((r) => ({
    name: r.inf.en,
    why_ar: `جمهوره في ${REGION_AR[r.inf.region]} ضمن فئة ${STR.ar.cats[r.inf.category]} يطابق منتجك بنسبة ${r.score}%، بتفاعل ${r.inf.engagement}%.`,
    why_en: `${REGION_EN[r.inf.region]} audience in ${STR.en.cats[r.inf.category]} matches your product at ${r.score}%, with ${r.inf.engagement}% engagement.`,
  }));
  return {
    headline_ar: `خطة ${ranked.length} مؤثرين لمنتج «${brief.product}»`,
    headline_en: `A ${ranked.length}-creator plan for "${brief.product}"`,
    summary_ar: `اخترنا نخبة مؤثري ${STR.ar.cats[brief.category]} الأقرب لأهدافك. التوقعات مبنية على أداء محتواهم الفعلي وحجم تفاعل جمهورهم.`,
    summary_en: `We shortlisted the ${STR.en.cats[brief.category]} creators closest to your goal. Projections are built from their real content performance and audience engagement.`,
    creators,
    risks_ar: "الأرقام تقديرية وتتأثر بجودة الإبداع وتوقيت النشر؛ ننصح بمحتوى مخصّص لكل مؤثر.",
    risks_en: "Numbers are estimates affected by creative quality and post timing; we recommend tailored content per creator.",
  };
}
