import { ArrowLeft, ChevronDown, Heart, SlidersHorizontal, Sparkles } from "lucide-react";
import "./_group.css";

const pink = "#ff4f6d";
const imgs = [1, 2, 3, 4, 5, 6];
const products = [
  ["Blazer oversized azul", "R$ 189,90", "ASOS"],
  ["Slip dress lima", "R$ 129,00", "Dafiti"],
  ["Cardigan coral", "R$ 98,90", "Renner"],
  ["Jaqueta varsity lilás", "R$ 219,90", "Urbanic"],
  ["Top mesh laranja", "R$ 79,90", "C&A"],
  ["Colete + saia vermelha", "R$ 159,90", "Zara"],
];

export function Resultados() {
  return (
    <div className="min-h-[100dvh] bg-[#fbfafb] text-[#17151a]">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      <main className="mx-auto min-h-[100dvh] w-full max-w-[430px] px-5 pb-8 pt-7" style={{ fontFamily: "Inter, sans-serif" }}>
        <header className="flex items-center justify-between">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e7e2e4] bg-white"><ArrowLeft size={18} /></button>
          <div className="text-[24px] font-extrabold tracking-[-1.3px]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>find<span style={{ color: pink }}>fit</span></div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e7e2e4] bg-white"><SlidersHorizontal size={17} /></button>
        </header>
        <section className="mt-7 flex items-center gap-3">
          <img src="/__mockup/images/fashion-b-3.jpg" className="h-14 w-14 rounded-2xl object-cover" alt="Sua foto" />
          <div><p className="text-xs font-semibold text-[#938b90]">sua busca</p><h1 className="text-[22px] font-bold tracking-[-.8px]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Resultados para sua foto</h1></div>
        </section>
        <div className="fashion-pulse mt-6 inline-flex items-center gap-2 rounded-full bg-[#dfff86] px-4 py-2.5 text-sm font-extrabold"><Sparkles size={15} /> 24 peças encontradas</div>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {["Tudo", "Roupas", "Acessórios", "Até R$ 150", "Mais parecidos"].map((f, i) => <button key={f} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold ${i === 0 ? "text-white" : "border border-[#e7e2e4] bg-white text-[#655d63]"}`} style={i === 0 ? { background: pink } : {}}>{f}</button>)}
        </div>
        <div className="mt-2 flex items-center justify-between"><p className="text-sm font-bold text-[#756d72]">mais relevantes</p><button className="flex items-center gap-1 rounded-full border border-[#e7e2e4] bg-white px-3 py-2 text-xs font-bold">Popular <ChevronDown size={14} /></button></div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {products.map(([name, price, shop], i) => <article key={name} className="overflow-hidden rounded-[20px] border border-[#eee9eb] bg-white shadow-[0_5px_18px_rgba(31,20,25,.05)]">
            <div className="relative"><img src={`/__mockup/images/fashion-b-${imgs[i]}.jpg`} alt={name} className="h-[205px] w-full object-cover" /><span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2 py-1 text-[10px] font-extrabold">{shop}</span><button className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90"><Heart size={16} /></button></div>
            <div className="p-3"><p className="truncate text-[13px] font-semibold">{name}</p><p className="mt-1 text-[16px] font-extrabold" style={{ color: pink }}>{price}</p></div>
          </article>)}
        </div>
      </main>
    </div>
  );
}