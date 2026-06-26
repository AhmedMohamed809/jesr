import { useState } from "react";
import { STR } from "./i18n";
import GlobalStyles from "./styles.jsx";
import { C } from "./theme";
import Header from "./components/Header";
import Home from "./components/Home";
import CompanyFlow from "./components/CompanyFlow";
import InfluencerDash from "./components/InfluencerDash";
import { Footer } from "./components/ui";

export default function App() {
  const [lang, setLang] = useState("ar");
  const [view, setView] = useState("home"); // home | company | influencer
  const t = STR[lang];

  return (
    <div dir={t.dir} style={{ minHeight: "100vh", background: C.ink, color: C.text }}>
      <GlobalStyles />
      <Header lang={lang} setLang={setLang} view={view} setView={setView} t={t} />
      {view === "home" && <Home t={t} lang={lang} setView={setView} />}
      {view === "company" && <CompanyFlow t={t} lang={lang} />}
      {view === "influencer" && <InfluencerDash t={t} lang={lang} />}
      <Footer t={t} lang={lang} />
    </div>
  );
}
