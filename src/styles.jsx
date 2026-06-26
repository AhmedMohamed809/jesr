import { C } from "./theme";

// Global stylesheet. Kept as a component so colors stay in one place (theme.js).
export default function GlobalStyles() {
  return (
    <style>{`
@import url('https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600;700&display=swap');
*{box-sizing:border-box}
html,body,#root{margin:0;min-height:100%}
body{background:${C.ink};font-family:'IBM Plex Sans Arabic','IBM Plex Sans',sans-serif}
button{font-family:inherit}
::selection{background:${C.coral};color:#fff}
.j-header{display:flex;align-items:center;justify-content:space-between;padding:16px clamp(16px,4vw,40px);position:sticky;top:0;z-index:30;background:rgba(12,16,36,.82);backdrop-filter:blur(14px);border-bottom:1px solid ${C.line}}
.j-pill{display:inline-flex;align-items:center;gap:6px;background:${C.ink2};color:${C.text};border:1px solid ${C.line2};border-radius:999px;padding:8px 14px;font-size:13px;font-weight:600;cursor:pointer;transition:.18s}
.j-pill:hover{border-color:${C.coral};color:#fff}
.j-wrap{max-width:1120px;margin:0 auto;padding:clamp(28px,5vw,60px) clamp(16px,4vw,40px) 80px}
.j-narrow{max-width:760px}
.j-eyebrow{display:inline-flex;align-items:center;gap:7px;font-size:12.5px;font-weight:600;color:${C.coral};background:${C.coral}14;border:1px solid ${C.coral}33;padding:6px 12px;border-radius:999px;letter-spacing:.2px}
.j-hero{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center;margin-bottom:54px}
.j-h1{font-family:'Readex Pro',sans-serif;font-weight:700;font-size:clamp(30px,5vw,50px);line-height:1.12;margin:18px 0 16px;letter-spacing:-.5px;background:linear-gradient(120deg,${C.text},${C.coral2});-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.j-sub{color:${C.muted};font-size:clamp(15px,2vw,17px);line-height:1.75;max-width:520px}
.j-trust{display:flex;flex-wrap:wrap;gap:18px;margin-top:24px;color:${C.muted};font-size:13px}
.j-trust span{display:inline-flex;align-items:center;gap:7px}
.j-hero-art{aspect-ratio:1.3;width:100%}
.j-roles{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.j-role{display:flex;align-items:center;gap:18px;text-align:start;background:linear-gradient(160deg,${C.ink2},${C.ink});border:1px solid ${C.line2};border-radius:20px;padding:24px;cursor:pointer;transition:.22s}
.j-role:hover{transform:translateY(-3px);border-color:${C.coral};box-shadow:0 18px 50px -20px ${C.coral}55}
.j-role-ic{width:56px;height:56px;border-radius:16px;display:grid;place-items:center;border:1px solid;flex-shrink:0}
.j-role-cta{font-weight:700;font-size:14px;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.j-rtl-flip{transition:.2s}
[dir=rtl] .j-rtl-flip{transform:scaleX(-1)}
.j-h2{font-family:'Readex Pro',sans-serif;font-weight:700;font-size:clamp(24px,4vw,34px);margin:0 0 8px;letter-spacing:-.4px}
.j-h3{font-family:'Readex Pro',sans-serif;font-weight:700;font-size:19px;display:flex;align-items:center;gap:9px;margin:30px 0 16px}
.j-sub2{color:${C.muted};font-size:15px;line-height:1.7;margin:0 0 26px}
.j-card{background:linear-gradient(160deg,${C.ink2},${C.ink});border:1px solid ${C.line2};border-radius:22px;padding:clamp(20px,3vw,30px)}
.j-form{display:flex;flex-direction:column;gap:18px}
.j-field{display:flex;flex-direction:column;gap:8px}
.j-label{font-size:13px;font-weight:600;color:${C.text};display:flex;align-items:center;gap:6px}
.j-input{width:100%;background:${C.ink};border:1px solid ${C.line2};border-radius:12px;padding:12px 14px;color:${C.text};font-size:14.5px;font-family:inherit;transition:.16s;outline:none}
.j-input:focus{border-color:${C.coral};box-shadow:0 0 0 3px ${C.coral}22}
textarea.j-input{resize:vertical;min-height:54px}
.j-grid2{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.j-select-wrap{position:relative}
.j-select-ic{position:absolute;top:50%;transform:translateY(-50%);color:${C.muted};pointer-events:none}
[dir=rtl] .j-select-ic{left:14px}
[dir=ltr] .j-select-ic{right:14px}
select.j-input{appearance:none;cursor:pointer}
.j-seg{display:flex;gap:6px;background:${C.ink};border:1px solid ${C.line2};border-radius:12px;padding:4px}
.j-seg-btn{flex:1;background:transparent;border:none;color:${C.muted};font-size:13.5px;font-weight:600;padding:9px;border-radius:9px;cursor:pointer;transition:.16s}
.j-seg-btn.on{background:${C.coral};color:#fff}
.j-chips{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.j-chip{background:${C.ink};border:1px solid ${C.line2};color:${C.muted};font-size:13px;font-weight:600;padding:8px 14px;border-radius:999px;cursor:pointer;transition:.16s}
.j-chip.on{background:${C.mint}1f;border-color:${C.mint};color:${C.mint}}
.j-budget-input{width:120px;padding:8px 12px}
.j-err{color:${C.coral};font-size:13px;font-weight:600;background:${C.coral}14;border:1px solid ${C.coral}33;padding:10px 14px;border-radius:10px}
.j-cta{display:inline-flex;align-items:center;justify-content:center;gap:9px;background:linear-gradient(120deg,${C.coral},${C.coral2});color:#fff;border:none;border-radius:14px;padding:15px;font-size:15.5px;font-weight:700;cursor:pointer;transition:.2s;box-shadow:0 14px 36px -14px ${C.coral}88;font-family:'Readex Pro',sans-serif}
.j-cta:hover{transform:translateY(-2px);box-shadow:0 20px 44px -14px ${C.coral}aa}
.j-cta-lg{width:100%;margin-top:24px;padding:17px;font-size:16px}
.j-load{display:flex;flex-direction:column;align-items:center;gap:18px;padding-top:70px}
.j-load-orb{width:84px;height:84px;border-radius:50%;display:grid;place-items:center;background:${C.coral}14;border:1px solid ${C.coral}44;animation:pulse 1.6s ease-in-out infinite}
.j-steps{display:flex;flex-direction:column;gap:12px;width:100%;max-width:380px;margin-top:8px}
.j-step{display:flex;align-items:center;gap:11px;color:${C.muted};font-size:14.5px;font-weight:500;opacity:.5;transition:.3s}
.j-step.now,.j-step.done{opacity:1;color:${C.text}}
.j-dot{width:16px;height:16px;border-radius:50%;border:2px solid ${C.line2}}
.j-res-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:22px;flex-wrap:wrap}
.j-roi{background:linear-gradient(150deg,${C.ink3},${C.ink2});border:1px solid ${C.line2};border-radius:22px;padding:clamp(18px,3vw,26px);display:grid;grid-template-columns:auto 1fr;gap:24px;align-items:center;margin-bottom:10px}
.j-roi-main{display:flex;align-items:center;gap:18px;padding-inline-end:24px;border-inline-end:1px solid ${C.line}}
.j-roi-big{font-family:'IBM Plex Mono',monospace;font-weight:700;font-size:42px;line-height:1;color:${C.mint};display:flex;align-items:baseline;gap:6px;margin-top:2px}
.j-roi-tag{font-family:'IBM Plex Sans Arabic';font-size:12px;color:${C.muted};font-weight:600;align-self:center}
.j-roi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.j-stat{background:${C.ink}66;border:1px solid ${C.line};border-radius:14px;padding:14px 16px}
.j-cards{display:flex;flex-direction:column;gap:14px}
.j-creator{background:linear-gradient(160deg,${C.ink2},${C.ink});border:1px solid ${C.line2};border-radius:18px;padding:18px;transition:.2s}
.j-creator:hover{transform:translateY(-2px);box-shadow:0 16px 40px -22px #000}
.j-creator-top{display:flex;align-items:center;gap:13px}
.j-rank{width:26px;height:26px;border-radius:8px;background:${C.gold}1f;color:${C.gold};font-weight:700;font-size:13px;display:grid;place-items:center;flex-shrink:0;font-family:'IBM Plex Mono',monospace}
.j-ava{width:46px;height:46px;border-radius:13px;border:1px solid;display:grid;place-items:center;font-weight:700;font-size:15px;flex-shrink:0;font-family:'IBM Plex Mono',monospace}
.j-ava.lg{width:58px;height:58px;font-size:18px;border-radius:16px}
.j-matchbox{text-align:center;flex-shrink:0}
.j-match-n{font-family:'IBM Plex Mono',monospace;font-weight:700;font-size:22px;color:${C.mint};line-height:1}
.j-match-l{font-size:10.5px;color:${C.muted};font-weight:600}
.j-bar{height:5px;background:${C.ink};border-radius:999px;margin:13px 0;overflow:hidden}
.j-bar span{display:block;height:100%;background:linear-gradient(90deg,${C.coral},${C.mint});border-radius:999px;transition:width 1s ease}
.j-creator-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px}
.j-creator-stats div{display:flex;flex-direction:column;gap:2px}
.j-creator-stats b{font-family:'IBM Plex Mono',monospace;font-size:15px}
.j-creator-stats span{font-size:10.5px;color:${C.muted}}
.j-proj{display:flex;flex-wrap:wrap;align-items:center;gap:14px;padding-top:12px;border-top:1px solid ${C.line};font-size:13px;font-weight:600;font-family:'IBM Plex Mono',monospace}
.j-proj>span{display:inline-flex;align-items:center;gap:5px}
.j-budgetflag{margin-inline-start:auto;font-size:11.5px;padding:4px 10px;border-radius:999px;display:inline-flex;align-items:center;gap:4px;font-family:'IBM Plex Sans Arabic'}
.j-budgetflag.ok{background:${C.mint}1c;color:${C.mint}}
.j-budgetflag.over{background:${C.muted}22;color:${C.muted}}
.j-why{margin-top:12px;font-size:13px;color:${C.text};line-height:1.6;background:${C.ink}66;border:1px solid ${C.line};border-radius:11px;padding:11px 13px}
.j-why-l{color:${C.coral};font-weight:700;font-size:11.5px;display:block;margin-bottom:3px}
.j-risk{margin-top:18px;background:${C.ink2}}
.j-profilebar{display:flex;align-items:center;gap:16px;background:linear-gradient(160deg,${C.ink2},${C.ink});border:1px solid ${C.line2};border-radius:20px;padding:18px 20px;margin-bottom:22px;flex-wrap:wrap}
.j-demo{font-size:10.5px;font-weight:700;color:${C.gold};background:${C.gold}1c;border:1px solid ${C.gold}44;padding:3px 9px;border-radius:999px}
.j-avail{display:inline-flex;align-items:center;gap:8px;background:${C.ink};border:1px solid ${C.line2};color:${C.muted};font-weight:600;font-size:13px;padding:9px 16px;border-radius:999px;cursor:pointer;transition:.18s}
.j-avail.on{color:${C.mint};border-color:${C.mint}55}
.j-avail-dot{width:8px;height:8px;border-radius:50%;background:${C.muted}}
.j-avail.on .j-avail-dot{background:${C.mint};box-shadow:0 0 0 4px ${C.mint}33}
.j-dash-cols{display:grid;grid-template-columns:1fr 1fr;gap:26px;align-items:start}
.j-offer{display:flex;align-items:center;gap:14px;background:${C.ink2};border:1px solid ${C.line2};border-radius:16px;padding:16px;margin-bottom:12px}
.j-offer-btns{display:flex;flex-direction:column;gap:7px}
.j-accept{background:${C.mint};color:${C.ink};border:none;font-weight:700;font-size:13px;padding:8px 18px;border-radius:9px;cursor:pointer;transition:.16s}
.j-accept:hover{filter:brightness(1.08)}
.j-decline{background:transparent;color:${C.muted};border:1px solid ${C.line2};font-weight:600;font-size:13px;padding:8px 18px;border-radius:9px;cursor:pointer}
.j-decline:hover{color:${C.coral};border-color:${C.coral}}
.j-accepted{color:${C.mint};font-weight:700;font-size:13.5px;white-space:nowrap}
.j-empty{color:${C.muted};font-size:13.5px;background:${C.ink2};border:1px dashed ${C.line2};border-radius:14px;padding:18px;text-align:center}
.j-active{background:linear-gradient(160deg,${C.ink2},${C.ink});border:1px solid ${C.line2};border-radius:16px;padding:18px;margin-bottom:14px}
.j-link{display:flex;align-items:center;justify-content:space-between;gap:8px;background:${C.ink};border:1px solid ${C.line2};border-radius:11px;padding:9px 9px 9px 14px;margin-bottom:14px}
.j-link code{font-family:'IBM Plex Mono',monospace;font-size:13px;color:${C.coral2};overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.j-copy{display:inline-flex;align-items:center;gap:5px;background:${C.ink3};border:1px solid ${C.line2};color:${C.text};font-size:12.5px;font-weight:600;padding:7px 12px;border-radius:8px;cursor:pointer;white-space:nowrap;transition:.16s}
.j-copy:hover{border-color:${C.coral}}
.j-active-stats{display:flex;gap:22px;font-size:13px;color:${C.muted}}
.j-active-stats b{font-family:'IBM Plex Mono',monospace;color:${C.text};font-size:15px;margin-inline-end:4px}
.j-footer{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:24px clamp(16px,4vw,40px);border-top:1px solid ${C.line};flex-wrap:wrap}
@keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.08);opacity:.8}}
@keyframes spin{to{transform:rotate(360deg)}}
.j-spin{animation:spin 1s linear infinite}
@keyframes draw{to{stroke-dashoffset:0}}
.j-draw{animation:draw 1.1s ease forwards}
@keyframes pop{0%{transform:scale(0);opacity:0}60%{transform:scale(1.12)}100%{transform:scale(1);opacity:1}}
.j-node{transform-box:fill-box;transform-origin:center;animation:pop .5s ease forwards;opacity:0}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.j-fade{animation:fadeUp .5s ease}
@media (max-width:860px){
  .j-hero{grid-template-columns:1fr}
  .j-hero-art{max-width:360px;margin:0 auto}
  .j-roles{grid-template-columns:1fr}
  .j-grid2{grid-template-columns:1fr}
  .j-roi{grid-template-columns:1fr}
  .j-roi-main{border-inline-end:none;border-bottom:1px solid ${C.line};padding-inline-end:0;padding-bottom:18px}
  .j-roi-grid{grid-template-columns:repeat(2,1fr)}
  .j-dash-cols{grid-template-columns:1fr}
  .j-creator-stats{grid-template-columns:repeat(2,1fr)}
}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`}</style>
  );
}
