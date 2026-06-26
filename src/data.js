// Demo creator pool + reference tables. Swap POOL for a real DB later.
export const CATEGORIES = ["tech","beauty","food","fitness","gaming","fashion","business","travel","family","comedy"];

export const ADJ = {
  tech: ["gaming","business"], beauty: ["fashion","family"], food: ["family","travel"],
  fitness: ["food","family"], gaming: ["tech","comedy"], fashion: ["beauty","travel"],
  business: ["tech","travel"], travel: ["food","fashion"], family: ["food","beauty"],
  comedy: ["gaming","family"],
};

export const CAT_AOV = { tech: 70, beauty: 45, food: 25, fitness: 55, gaming: 35, fashion: 60, business: 120, travel: 350, family: 40, comedy: 30 };

export const REGION_KEYS = ["SA","AE","EG","KW","QA","JO","MA"];
export const REGION_AR = { SA:"السعودية", AE:"الإمارات", EG:"مصر", KW:"الكويت", QA:"قطر", JO:"الأردن", MA:"المغرب" };
export const REGION_EN = { SA:"Saudi Arabia", AE:"UAE", EG:"Egypt", KW:"Kuwait", QA:"Qatar", JO:"Jordan", MA:"Morocco" };

// Fictional creators for the demo.
export const POOL = [
  { id:"c1", ar:"ليان الزهراني", en:"Layan Alzahrani", handle:"@layan.glow", region:"SA", reach:["AE","KW"], category:"beauty", followers:1280000, avgViews:340000, engagement:6.4, price:5200, audGender:"f", color:"#FF6A45" },
  { id:"c2", ar:"عمر الفيصل", en:"Omar Alfaisal", handle:"@omartech", region:"AE", reach:["SA","QA"], category:"tech", followers:870000, avgViews:210000, engagement:5.1, price:4100, audGender:"m", color:"#8B7BFF" },
  { id:"c3", ar:"مريم سعيد", en:"Mariam Saeed", handle:"@mariam.kitchen", region:"EG", reach:["SA","JO"], category:"food", followers:2100000, avgViews:560000, engagement:7.2, price:3800, audGender:"f", color:"#54E6BE" },
  { id:"c4", ar:"خالد المطيري", en:"Khaled Almutairi", handle:"@khaledplays", region:"KW", reach:["SA","AE"], category:"gaming", followers:1640000, avgViews:480000, engagement:8.1, price:4600, audGender:"m", color:"#F3C24E" },
  { id:"c5", ar:"نورة القحطاني", en:"Noura Alqahtani", handle:"@noura.style", region:"SA", reach:["AE","QA","KW"], category:"fashion", followers:990000, avgViews:260000, engagement:5.9, price:4400, audGender:"f", color:"#FF8A63" },
  { id:"c6", ar:"يوسف حدّاد", en:"Yousef Haddad", handle:"@yousef.fit", region:"JO", reach:["SA","EG"], category:"fitness", followers:720000, avgViews:185000, engagement:6.8, price:2900, audGender:"m", color:"#5EE0C4" },
  { id:"c7", ar:"سلمى التازي", en:"Salma Tazi", handle:"@salma.travels", region:"MA", reach:["AE","SA"], category:"travel", followers:1130000, avgViews:300000, engagement:5.4, price:3600, audGender:"all", color:"#7BD3FF" },
  { id:"c8", ar:"فهد العتيبي", en:"Fahad Alotaibi", handle:"@fahad.biz", region:"SA", reach:["AE","KW","QA"], category:"business", followers:540000, avgViews:120000, engagement:4.7, price:5800, audGender:"m", color:"#C9A227" },
  { id:"c9", ar:"دانة الهاجري", en:"Dana Alhajri", handle:"@dana.daily", region:"QA", reach:["SA","AE"], category:"family", followers:1480000, avgViews:410000, engagement:6.1, price:4200, audGender:"f", color:"#FF6A9C" },
  { id:"c10", ar:"زياد كرم", en:"Ziad Karam", handle:"@ziadlaughs", region:"EG", reach:["SA","AE","JO"], category:"comedy", followers:3200000, avgViews:900000, engagement:9.3, price:6400, audGender:"all", color:"#FFB04A" },
  { id:"c11", ar:"ريما الشمري", en:"Rima Alshammari", handle:"@rima.beauty", region:"KW", reach:["SA","QA"], category:"beauty", followers:680000, avgViews:170000, engagement:7.0, price:3100, audGender:"f", color:"#FF7A5A" },
  { id:"c12", ar:"تميم النعيمي", en:"Tamim Alnuaimi", handle:"@tamim.tech", region:"AE", reach:["SA","KW"], category:"tech", followers:1020000, avgViews:240000, engagement:5.6, price:4800, audGender:"m", color:"#9D8DFF" },
  { id:"c13", ar:"هند العنزي", en:"Hind Alenezi", handle:"@hind.style", region:"SA", reach:["AE","KW","QA","JO"], category:"fashion", followers:1750000, avgViews:430000, engagement:6.6, price:5100, audGender:"f", color:"#FF9466" },
  { id:"c14", ar:"بدر الدوسري", en:"Badr Aldosari", handle:"@badr.eats", region:"SA", reach:["AE","KW"], category:"food", followers:910000, avgViews:250000, engagement:6.9, price:3400, audGender:"all", color:"#6FE0B0" },
];
