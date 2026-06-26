import { ArrowRight, ArrowLeft, Languages } from "lucide-react";
import { Logo } from "./ui";

export default function Header({ lang, setLang, view, setView, t }) {
  return (
    <header className="j-header">
      <button onClick={() => setView("home")} style={{ all: "unset", cursor: "pointer" }} aria-label={t.backHome}>
        <Logo lang={lang} />
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {view !== "home" && (
          <button className="j-pill" onClick={() => setView("home")}>
            {lang === "ar" ? <ArrowRight size={15} /> : <ArrowLeft size={15} />} {t.backHome}
          </button>
        )}
        <button className="j-pill" onClick={() => setLang(lang === "ar" ? "en" : "ar")}>
          <Languages size={15} /> {lang === "ar" ? "EN" : "ع"}
        </button>
      </div>
    </header>
  );
}
