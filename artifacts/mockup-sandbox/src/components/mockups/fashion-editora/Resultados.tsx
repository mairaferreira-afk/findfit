import { useState } from "react";
import { ArrowDownUp, Heart, SlidersHorizontal } from "lucide-react";

const products = [
  ["Blusa Aura", "Marta", "R$ 189", "fashion-a-1.jpg", "Blusas"],
  ["Vestido Oliva", "Casa Vela", "R$ 329", "fashion-a-2.jpg", "Vestidos"],
  ["Calça Nilo", "Orla Studio", "R$ 278", "fashion-a-3.jpg", "Calças"],
  ["Cardigan Sol", "Nativa", "R$ 219", "fashion-a-4.jpg", "Blusas"],
  ["Top Noite", "Ateliê 27", "R$ 159", "fashion-a-5.jpg", "Blusas"],
  ["Linho Claro", "Marta", "R$ 246", "fashion-a-6.jpg", "Calças"],
];
const filters = ["Todas", "Blusas", "Calças", "Vestidos", "Acessórios"];

export function Resultados() {
  const [active, setActive] = useState("Todas");
  const [favorites, setFavorites] = useState<string[]>([]);
  const visible = active === "Todas" ? products : products.filter((p) => p[4] === active);
  return (
    <div className="min-h-[100dvh] bg-[#f7f3ed] text-[#1b1917]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
      <main className="mx-auto w-full max-w-[470px] px-5 pb-12">
        <header className="flex items-center justify-between pt-7">
          <div className="text-[23px] tracking-[-1.3px]" style={{ fontFamily: "'Playfair Display', serif" }}>findfit</div>
          <button type="button" className="flex items-center gap-2 text-[11px] text-[#7d736c]"><ArrowDownUp size={15} strokeWidth={1.4} /> ordenar</button>
        </header>
        <div className="mt-9 flex items-center gap-3 border-b border-[#dfd5ca] pb-5">
          <img src="/__mockup/images/fashion-a-1.jpg" alt="Referência enviada" className="h-12 w-12 object-cover" />
          <div><p className="text-[10px] uppercase tracking-[.18em] text-[#998c82]">Referência</p><p className="mt-1 text-[12px]">Peças parecidas com <i>seu look</i></p></div>
        </div>
        <section className="pt-7">
          <p className="text-[10px] uppercase tracking-[.2em] text-[#a36b58]">curadoria visual · 01</p>
          <h1 className="mt-3 text-[34px] tracking-[-1.5px]" style={{ fontFamily: "'Playfair Display', serif" }}>Encontramos <i>24 peças</i></h1>
        </section>
        <nav className="no-scrollbar -mx-5 mt-8 flex gap-5 overflow-x-auto px-5 pb-1">
          {filters.map((filter) => <button type="button" key={filter} onClick={() => setActive(filter)} className={`whitespace-nowrap border-b pb-2 text-[11px] transition-colors ${active === filter ? "border-[#1b1917] text-[#1b1917]" : "border-transparent text-[#9b9087]"}`}>{filter}</button>)}
        </nav>
        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-8">
          {visible.map(([name, shop, price, image]) => {
            const liked = favorites.includes(name);
            return <article key={name} className="group">
              <div className="relative aspect-[.78] overflow-hidden bg-[#eee6dc]"><img src={`/__mockup/images/${image}`} alt={name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <button type="button" aria-label={`Favoritar ${name}`} onClick={() => setFavorites((f) => liked ? f.filter((x) => x !== name) : [...f, name])} className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center bg-[#f7f3ed]/85"><Heart size={15} strokeWidth={1.3} fill={liked ? "#a75d45" : "none"} color={liked ? "#a75d45" : "#302b27"} /></button>
              </div>
              <div className="pt-3"><div className="flex items-start justify-between gap-2"><div><h2 className="text-[12px]">{name}</h2><p className="mt-1 text-[10px] text-[#958981]">{shop}</p></div><span className="text-[12px] font-medium">{price}</span></div></div>
            </article>;
          })}
        </div>
        {!visible.length && <div className="py-20 text-center text-sm text-[#8d827a]"><SlidersHorizontal className="mx-auto mb-3" size={20} />Ainda estamos procurando acessórios parecidos.</div>}
      </main>
    </div>
  );
}