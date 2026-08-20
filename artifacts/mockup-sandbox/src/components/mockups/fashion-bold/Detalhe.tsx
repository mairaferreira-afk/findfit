import { ArrowLeft, Check, Heart, MapPin, ShoppingBag, Truck } from "lucide-react";
import "./_group.css";

const pink = "#ff4f6d";
const related = [[2, "Slip dress lima", "R$ 129"], [4, "Varsity lilás", "R$ 219"], [6, "Colete + saia", "R$ 159"]];

export function Detalhe() {
  return (
    <div className="min-h-[100dvh] bg-white text-[#17151a]">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      <main className="mx-auto w-full max-w-[430px] pb-8" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="relative h-[410px]"><img src="/__mockup/images/fashion-b-1.jpg" alt="Blazer oversized azul" className="h-full w-full object-cover" /><button className="absolute left-5 top-7 flex h-10 w-10 items-center justify-center rounded-full bg-white/90"><ArrowLeft size={19} /></button><button className="absolute right-5 top-7 flex h-10 w-10 items-center justify-center rounded-full bg-white/90"><Heart size={18} /></button><span className="absolute bottom-5 left-5 rounded-full bg-white px-3 py-2 text-xs font-extrabold">ASOS</span></div>
        <section className="px-5 pt-6">
          <p className="text-xs font-bold uppercase tracking-[1.7px] text-[#938b90]">achamos uma parecida</p>
          <div className="mt-2 flex items-start justify-between gap-4"><h1 className="text-[28px] font-bold leading-8 tracking-[-1px]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Blazer oversized<br />azul elétrico</h1><button className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff0f2]" style={{ color: pink }}><Heart size={19} /></button></div>
          <p className="mt-3 text-[28px] font-extrabold" style={{ color: pink }}>R$ 189,90</p>
          <div className="mt-6"><p className="mb-3 text-sm font-bold">Escolha seu tamanho</p><div className="flex gap-2">{["P", "M", "G", "GG"].map((s, i) => <button key={s} className={`h-11 w-12 rounded-full text-sm font-bold ${i === 1 ? "text-white" : "border border-[#e8e3e5] bg-white"}`} style={i === 1 ? { background: pink } : {}}>{s}</button>)}</div></div>
          <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-[#f7f5f6] p-4"><div className="flex gap-2"><Truck size={17} style={{ color: pink }} /><div><p className="text-xs font-bold">Frete grátis</p><p className="mt-1 text-[10px] text-[#8b8288]">acima de R$ 199</p></div></div><div className="flex gap-2"><MapPin size={17} style={{ color: pink }} /><div><p className="text-xs font-bold">Chega em 4–7 dias</p><p className="mt-1 text-[10px] text-[#8b8288]">para São Paulo</p></div></div></div>
          <button className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full text-sm font-extrabold text-white shadow-[0_10px_22px_rgba(255,79,109,.22)]" style={{ background: pink }}><ShoppingBag size={18} /> Ver na loja <Check size={16} /></button>
          <div className="mt-8 flex items-center justify-between"><h2 className="text-lg font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Você também vai amar</h2><span className="text-xs font-bold" style={{ color: pink }}>ver tudo</span></div>
          <div className="mt-4 flex gap-3 overflow-x-auto">{related.map(([num, name, price]) => <div key={name} className="w-[125px] shrink-0"><img src={`/__mockup/images/fashion-b-${num}.jpg`} alt={String(name)} className="h-[145px] w-full rounded-2xl object-cover" /><p className="mt-2 truncate text-xs font-bold">{name}</p><p className="mt-1 text-sm font-extrabold" style={{ color: pink }}>{price}</p></div>)}</div>
        </section>
      </main>
    </div>
  );
}