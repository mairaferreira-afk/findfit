import { useState } from "react";
import { ArrowLeft, Heart, Share2 } from "lucide-react";

const similar = [
  ["Top Noite", "fashion-a-5.jpg", "R$ 159"],
  ["Cardigan Sol", "fashion-a-4.jpg", "R$ 219"],
  ["Linho Claro", "fashion-a-6.jpg", "R$ 246"],
  ["Vestido Oliva", "fashion-a-2.jpg", "R$ 329"],
];

export function Detalhe() {
  const [liked, setLiked] = useState(false);
  return (
    <div className="min-h-[100dvh] bg-[#f7f3ed] text-[#1b1917]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
      <main className="mx-auto w-full max-w-[470px] pb-12">
        <div className="relative h-[61vh] min-h-[450px] bg-[#ebe1d7]">
          <img src="/__mockup/images/fashion-a-1.jpg" alt="Blusa Aura em cetim marfim" className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
            <button type="button" aria-label="Voltar" onClick={() => window.history.back()} className="flex h-10 w-10 items-center justify-center bg-[#f7f3ed]/90"><ArrowLeft size={18} strokeWidth={1.3} /></button>
            <div className="flex gap-2"><button type="button" aria-label="Compartilhar" className="flex h-10 w-10 items-center justify-center bg-[#f7f3ed]/90"><Share2 size={16} strokeWidth={1.3} /></button><button type="button" aria-label="Favoritar" onClick={() => setLiked(!liked)} className="flex h-10 w-10 items-center justify-center bg-[#f7f3ed]/90"><Heart size={17} strokeWidth={1.3} fill={liked ? "#a75d45" : "none"} color={liked ? "#a75d45" : "#1b1917"} /></button></div>
          </div>
        </div>
        <section className="px-5 pt-7">
          <p className="text-[10px] uppercase tracking-[.19em] text-[#a36b58]">Marta · coleção 2024</p>
          <div className="mt-3 flex items-end justify-between gap-4"><div><h1 className="text-[31px] tracking-[-1.3px]" style={{ fontFamily: "'Playfair Display', serif" }}>Blusa Aura</h1><p className="mt-1 text-[12px] text-[#8d827a]">Marta</p></div><strong className="text-[22px] font-medium tracking-[-.5px]">R$ 189</strong></div>
          <div className="mt-7 grid grid-cols-3 border-y border-[#dfd5ca] py-4 text-[10px] text-[#756b63]"><div><p className="mb-1 uppercase tracking-[.12em] text-[#aa9c91]">Tamanho</p>M ao GG</div><div className="border-x border-[#dfd5ca] px-3"><p className="mb-1 uppercase tracking-[.12em] text-[#aa9c91]">Material</p>Cetim</div><div className="pl-3"><p className="mb-1 uppercase tracking-[.12em] text-[#aa9c91]">Entrega</p>Frete grátis</div></div>
          <button type="button" onClick={() => window.open("#loja", "_self")} className="mt-7 w-full bg-[#1e1b19] py-4 text-[13px] text-[#f8f3eb]">Ver na loja</button>
          <section className="mt-12"><div className="flex items-end justify-between"><h2 className="text-[22px] tracking-[-.6px]" style={{ fontFamily: "'Playfair Display', serif" }}>Peças similares</h2><span className="text-[10px] uppercase tracking-[.14em] text-[#998b81]">ver todas</span></div><div className="no-scrollbar mt-5 flex gap-3 overflow-x-auto pb-2">{similar.map(([name, image, price]) => <button type="button" key={name} className="w-[118px] shrink-0 text-left"><img src={`/__mockup/images/${image}`} alt={name} className="h-[145px] w-full object-cover" /><p className="mt-2 text-[11px]">{name}</p><p className="mt-1 text-[11px] text-[#806f64]">{price}</p></button>)}</div></section>
        </section>
      </main>
    </div>
  );
}