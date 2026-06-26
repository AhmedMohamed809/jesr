// Optional AI backend for Jisr.
// Holds the Anthropic API key server-side and exposes POST /api/strategy.
// The frontend works WITHOUT this server (it falls back to a local engine),
// but running it gives you real AI-written campaign strategy and reasoning.
//
//   1. cp .env.example .env   and set ANTHROPIC_API_KEY
//   2. npm run server         (this file, port 8787)
//   3. npm run dev            (frontend, in another terminal)

import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const PORT = process.env.PORT || 8787;
const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

app.get("/api/health", (_req, res) => res.json({ ok: true, ai: Boolean(API_KEY) }));

app.post("/api/strategy", async (req, res) => {
  const { brief, creators, lang } = req.body || {};
  if (!brief || !Array.isArray(creators)) {
    return res.status(400).json({ error: "brief and creators are required" });
  }
  if (!API_KEY) {
    // No key configured — tell the client so it uses its local fallback.
    return res.status(503).json({ error: "ANTHROPIC_API_KEY not set" });
  }

  const prompt =
`You are a senior influencer-marketing strategist at "Jisr", a platform connecting Arab-world brands with creators.
Write in a confident, concrete, persuasive tone aimed at a brand owner deciding whether to spend.

BRAND BRIEF: ${JSON.stringify(brief)}

PRE-MATCHED CREATORS (already ranked by our model): ${JSON.stringify(creators)}

Return ONLY raw JSON (no markdown, no code fences, no commentary) with EXACTLY this shape:
{"headline_en":"","headline_ar":"","summary_en":"","summary_ar":"","creators":[{"name":"<exact name from list>","why_en":"one sharp sentence","why_ar":"one sharp sentence"}],"risks_en":"","risks_ar":""}
Rules: summary_* = 2 sentences max, references the brand's goal and projected numbers. creators array must include EVERY creator above in the SAME order, why_* = one specific reason tied to niche/region/audience. risks_* = one honest watch-out. Arabic must be natural Modern Standard Arabic. Current UI language: ${lang}.`;

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1400,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      return res.status(502).json({ error: "anthropic error", detail });
    }

    const data = await r.json();
    let text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n");
    text = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    const s = text.indexOf("{"), e = text.lastIndexOf("}");
    if (s !== -1 && e !== -1) text = text.slice(s, e + 1);
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (err) {
    return res.status(500).json({ error: "strategy generation failed", detail: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Jisr AI backend on http://localhost:${PORT}  (AI ${API_KEY ? "enabled" : "disabled — set ANTHROPIC_API_KEY"})`);
});
