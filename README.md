# جسر · Jisr

منصة تربط العلامات التجارية بالمؤثرين في الوطن العربي — مطابقة ذكية، وتوقّع للعائد، ولوحتان منفصلتان للشركات وللمؤثرين.
A bilingual (Arabic / English) marketplace connecting Arab-world brands with influencers — AI matching, ROI projection, and separate dashboards for brands and creators.

---

## ما الذي يفعله / What it does

- **واجهة الشركة (Brand):** يكتب صاحب العلامة معلومات منتجه (الفئة، السوق، الجمهور، الهدف، الوصول/المشاهدات، الميزانية). يطابق النظام آلاف المؤثرين، يعرض **أفضل ٥**، ويحسب الوصول والنقرات والتحويلات و**العائد المتوقع (ROI)** قبل الدفع.
- **واجهة المؤثر (Creator):** لوحة تحكم فيها العروض الواردة (قبول/اعتذار)، الحملات النشطة مع **رابط تتبّع فريد** لكل حملة، عدّاد النقرات والتحويلات، رسم بياني للأداء، والأرباح.
- **العمولة:** المنصة تأخذ نسبة من الحملة (افتراضياً 15%) ولا تأخذ شيئاً من المؤثر.

---

## التشغيل / Quick start

```bash
npm install
npm run dev          # فتح http://localhost:5173
```

التطبيق يعمل بالكامل فوراً — حتى بدون مفتاح ذكاء اصطناعي — باستخدام محرّك المطابقة المحلي.
The app runs fully out of the box (no API key needed) using the built-in local matching engine.

### تفعيل الذكاء الاصطناعي الحقيقي / Enable real AI strategy (optional)

النصوص الاستراتيجية وأسباب الاختيار يمكن أن يكتبها نموذج Claude. المفتاح يبقى في الخادم فقط (لا يُكشف في المتصفح).

```bash
cp .env.example .env        # ثم ضع ANTHROPIC_API_KEY
npm run server              # الخادم على المنفذ 8787 (نافذة طرفية منفصلة)
npm run dev                 # الواجهة في نافذة أخرى
```

إذا لم يعمل الخادم أو فشل الطلب، تتحوّل الواجهة تلقائياً إلى المحرّك المحلي — لا ينكسر العرض أبداً.
If the backend is down or errors, the frontend silently falls back to the local engine.

### بناء للإنتاج / Production build

```bash
npm run build && npm run preview
```

---

## البنية / Project structure

```
jisr/
├─ index.html
├─ vite.config.js          # proxy: /api → backend on :8787
├─ .env.example
├─ server/
│  └─ index.js             # Express proxy to Anthropic (POST /api/strategy)
└─ src/
   ├─ main.jsx             # entry
   ├─ App.jsx              # view router (home | company | influencer)
   ├─ theme.js             # color tokens
   ├─ styles.jsx           # global styles (RTL/LTR aware)
   ├─ i18n.js              # AR/EN copy
   ├─ data.js              # creator pool + reference tables
   ├─ engine.js            # scoring, projections, AI call + local fallback
   └─ components/
      ├─ ui.jsx            # Logo, Stat, Gauge, Footer
      ├─ Header.jsx
      ├─ Home.jsx          # hero + role selection
      ├─ CompanyFlow.jsx   # brief form + loading
      ├─ Results.jsx       # ROI + top-5 creators + AI strategy
      └─ InfluencerDash.jsx
```

---

## كيف تُحسب الأرقام / How projections work

`src/engine.js` يحسب لكل مؤثر:
- **درجة المطابقة:** الفئة (40%) + توافق السوق (25%) + الجمهور (15%) + جودة التفاعل (20%).
- **التوقعات:** المشاهدات والوصول من متوسط أداء المؤثر، ثم النقرات (CTR مرتبط بالتفاعل)، ثم التحويلات (حسب هدف الحملة)، ثم الإيراد (× متوسط قيمة الطلب).

الأرقام تقديرية لأغراض اتخاذ القرار وليست وعوداً.
Numbers are decision-support estimates, not guarantees.

---

## خطوات لاحقة مقترحة / Roadmap

- قاعدة بيانات حقيقية للمؤثرين + التحقق من الحسابات (OAuth مع المنصات).
- تسجيل/مصادقة فعلية للطرفين، وتوليد روابط تتبّع حقيقية مع redirect وعدّ نقرات.
- بوابة دفع وضمان (escrow) وصرف أرباح المؤثرين.
- جعل نسبة العمولة قابلة للضبط، وتقارير أداء بعد الحملة.

---

اسم العمل: **جسر / Jisr** — "حيث تلتقي العلامات بالمؤثرين".
