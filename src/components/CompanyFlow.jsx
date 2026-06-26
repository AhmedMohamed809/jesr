import { useState, useEffect } from "react";
import { Sparkles, ChevronDown, Check, Loader2 } from "lucide-react";
import { C } from "../theme";
import { CATEGORIES, REGION_KEYS, REGION_AR, REGION_EN, POOL } from "../data";
import { rankCreators, getAIStrategy, fallbackStrategy, money } from "../engine";
import Results from "./Results";

export default function CompanyFlow({ t, lang }) {
  const [step, setStep] = useState("brief"); // brief | loading | results
  const [brief, setBrief] = useState({
    product: "", category: "beauty", desc: "", regions: ["SA", "AE"],
    gender: "all", goal: "sales", metric: "reach", target: 500000, budget: 20000, aov: "",
  });
  const [results, setResults] = useState(null);
  const [err, setErr] = useState("");

  async function run() {
    if (!brief.product.trim()) { setErr(t.needProduct); return; }
    setErr(""); setStep("loading");

    const ranked = rankCreators(POOL, brief, 5);

    let strat;
    try { strat = await getAIStrategy(brief, ranked, lang); }
    catch (e) { strat = fallbackStrategy(brief, ranked, lang); }
    if (!strat || !strat.creators) strat = fallbackStrategy(brief, ranked, lang);

    ranked.forEach((r) => {
      const m = (strat.creators || []).find((c) => c.name === r.inf.en);
      r.why = m ? { ar: m.why_ar, en: m.why_en } : { ar: "", en: "" };
    });

    setResults({ ranked, strat });
    setStep("results");
  }

  if (step === "loading") return <Loading t={t} />;
  if (step === "results") return <Results t={t} lang={lang} data={results} brief={brief} onEdit={() => setStep("brief")} />;
  return <Brief t={t} lang={lang} brief={brief} setBrief={setBrief} err={err} onRun={run} />;
}

function Field({ label, children }) {
  return (
    <label className="j-field">
      <span className="j-label">{label}</span>
      {children}
    </label>
  );
}

function Brief({ t, lang, brief, setBrief, err, onRun }) {
  const up = (k, v) => setBrief((b) => ({ ...b, [k]: v }));
  const toggleRegion = (k) =>
    up("regions", brief.regions.includes(k) ? brief.regions.filter((x) => x !== k) : [...brief.regions, k]);
  const budgets = [5000, 10000, 20000, 50000];
  const regionName = lang === "ar" ? REGION_AR : REGION_EN;

  return (
    <main className="j-wrap j-narrow j-fade">
      <h2 className="j-h2">{t.briefTitle}</h2>
      <p className="j-sub2">{t.briefSub}</p>

      <div className="j-card j-form">
        <Field label={t.fProduct}>
          <input className="j-input" value={brief.product} onChange={(e) => up("product", e.target.value)} placeholder={t.fProductPh} />
        </Field>

        <div className="j-grid2">
          <Field label={t.fCategory}>
            <div className="j-select-wrap">
              <select className="j-input" value={brief.category} onChange={(e) => up("category", e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{t.cats[c]}</option>)}
              </select>
              <ChevronDown size={16} className="j-select-ic" />
            </div>
          </Field>
          <Field label={t.fGender}>
            <div className="j-seg">
              {[["all", t.genderAll], ["f", t.genderF], ["m", t.genderM]].map(([v, l]) => (
                <button key={v} className={"j-seg-btn" + (brief.gender === v ? " on" : "")} onClick={() => up("gender", v)}>{l}</button>
              ))}
            </div>
          </Field>
        </div>

        <Field label={t.fDesc}>
          <textarea className="j-input" rows={2} value={brief.desc} onChange={(e) => up("desc", e.target.value)} placeholder={t.fDescPh} />
        </Field>

        <Field label={t.fRegions}>
          <div className="j-chips">
            {REGION_KEYS.map((k) => (
              <button key={k} className={"j-chip" + (brief.regions.includes(k) ? " on" : "")} onClick={() => toggleRegion(k)}>
                {regionName[k]}
              </button>
            ))}
          </div>
        </Field>

        <Field label={t.fGoal}>
          <div className="j-seg">
            {[["aware", t.fGoalAware], ["sales", t.fGoalSales], ["installs", t.fGoalInstalls]].map(([v, l]) => (
              <button key={v} className={"j-seg-btn" + (brief.goal === v ? " on" : "")} onClick={() => up("goal", v)}>{l}</button>
            ))}
          </div>
        </Field>

        <div className="j-grid2">
          <Field label={t.fMetric}>
            <div className="j-seg" style={{ marginBottom: 8 }}>
              {[["reach", t.fReach], ["views", t.fViews]].map(([v, l]) => (
                <button key={v} className={"j-seg-btn" + (brief.metric === v ? " on" : "")} onClick={() => up("metric", v)}>{l}</button>
              ))}
            </div>
            <input className="j-input" type="number" value={brief.target} onChange={(e) => up("target", e.target.value)} />
          </Field>
          <Field label={t.fAov}>
            <input className="j-input" type="number" value={brief.aov} onChange={(e) => up("aov", e.target.value)} placeholder={t.fAovPh} />
          </Field>
        </div>

        <Field label={t.fBudget}>
          <div className="j-chips">
            {budgets.map((b) => (
              <button key={b} className={"j-chip" + (Number(brief.budget) === b ? " on" : "")} onClick={() => up("budget", b)}>{money(b)}</button>
            ))}
            <input className="j-input j-budget-input" type="number" value={brief.budget} onChange={(e) => up("budget", e.target.value)} />
          </div>
        </Field>

        {err && <div className="j-err">{err}</div>}

        <button className="j-cta" onClick={onRun}>
          <Sparkles size={18} /> {t.analyze}
        </button>
      </div>
    </main>
  );
}

function Loading({ t }) {
  const steps = [t.step1, t.step2, t.step3, t.step4];
  const [done, setDone] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setDone((d) => Math.min(steps.length, d + 1)), 850);
    return () => clearInterval(id);
  }, []);
  return (
    <main className="j-wrap j-narrow j-load">
      <div className="j-load-orb"><Sparkles size={30} color={C.coral} /></div>
      <h2 className="j-h2" style={{ textAlign: "center" }}>{t.loadingTitle}</h2>
      <div className="j-steps">
        {steps.map((s, i) => (
          <div key={i} className={"j-step" + (i < done ? " done" : i === done ? " now" : "")}>
            {i < done ? <Check size={16} color={C.mint} /> : i === done ? <Loader2 size={16} className="j-spin" color={C.coral} /> : <span className="j-dot" />}
            {s}
          </div>
        ))}
      </div>
    </main>
  );
}
