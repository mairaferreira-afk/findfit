import { ArrowDownUp, ChevronLeft, Heart, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const image = (name: string) => `/__mockup/images/${name}`;
const items = [
  { photo: "dress-1.jpg", name: "vestido midi slip", shop: "Zara", price: "R$ 299,90", badge: "mais parecido" },
  { photo: "dress-2.jpg", name: "vestido longo crepe", shop: "Mango", price: "R$ 349,90", badge: null },
  { photo: "dress-3.jpg", name: "vestido acetinado alça fina", shop: "Renner", price: "R$ 189,90", badge: "melhor preço" },
  { photo: "dress-4.jpg", name: "vestido midi elegant", shop: "Farm", price: "R$ 520,00", badge: null },
  { photo: "dress-5.jpg", name: "vestido longo chiffon", shop: "COS", price: "R$ 890,00", badge: null },
  { photo: "dress-6.jpg", name: "vestido bias-cut", shop: "Le Lis Blanc", price: "R$ 1.290,00", badge: null },
];

export function Resultados() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  return (
    <div className="min-h-[100dvh] bg-white text-[#161513]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <main className="mx-auto w-full max-w-[430px] px-5 pb-10 pt-7">
        <header className="flex items-center justify-between">
          <button type="button" onClick={() => window.history.back()} aria-label="Voltar"><ChevronLeft size={20} strokeWidth={1.35} /></button>
          <p className="text-[12px] font-semibold uppercase tracking-[0.35em]">findfit</p>
          <button type="button" aria-label="Filtros"><SlidersHorizontal size={18} strokeWidth={1.3} /></button>
        </header>
        <div className="mt-7 flex items-center gap-3">
          <img src={image("ref-vestido.jpg")} className="h-[53px] w-[43px] object-cover object-top" alt="Imagem de referência" />
          <div><h1 className="text-[21px] font-medium tracking-[-0.04em]">24 resultados</h1><p className="mt-1 text-[11px] text-[#9a938d]">peças semelhantes à sua referência</p></div>
        </div>
        <div className="mt-7 flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
          {["Todos", "Mais parecidos", "Até R$ 500", "Premium"].map((filter) => <button key={filter} type="button" onClick={() => setActiveFilter(filter)} className={`shrink-0 border px-3 py-1.5 text-[10px] ${activeFilter === filter ? "border-[#171614] font-medium" : "border-[#d9d4cf] text-[#77716b]"}`}>{filter}</button>)}
        </div>
        <div className="mt-6 flex items-center justify-between border-b border-[#e9e5e1] pb-4 text-[11px] text-[#77716b]">
          <span>Peças selecionadas</span><button type="button" className="flex items-center gap-1.5 text-[#37332f]">Ordenar <ArrowDownUp size={13} strokeWidth={1.3} /></button>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-7">
          {items.map((item) => <article key={item.name} onClick={() => { window.location.href = "/__mockup/preview/fashion-chic/Detalhe"; }} className="cursor-pointer">
            <div className="relative bg-[#f5f2ef]">
              <img src={image(item.photo)} alt={item.name} className="h-[224px] w-full object-cover object-top" />
              <button type="button" aria-label={`Favoritar ${item.name}`} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-white/85"><Heart size={16} strokeWidth={1.25} /></button>
            </div>
            <div className="mt-3 flex items-start justify-between gap-2"><div><h2 className="text-[12px] font-medium lowercase">{item.name}</h2><p className="mt-1 text-[10px] lowercase text-[#97918b]">{item.shop}</p>{item.badge && <span className="mt-2 inline-block text-[9px] uppercase tracking-[0.08em] text-[#c9b6a1]">{item.badge}</span>}</div><p className="text-[11px] font-medium">{item.price}</p></div>
          </article>)}
        </div>
      </main>
    </div>
  );
}