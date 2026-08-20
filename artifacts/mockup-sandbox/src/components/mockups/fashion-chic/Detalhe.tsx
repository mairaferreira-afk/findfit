import { ArrowLeft, Heart, ExternalLink, ChevronRight } from "lucide-react";

const image = (name: string) => `/__mockup/images/${name}`;
const similar = [{ photo: "dress-3.jpg", name: "vestido acetinado alça fina", price: "R$ 189,90" }, { photo: "dress-4.jpg", name: "vestido midi elegant", price: "R$ 520,00" }, { photo: "dress-5.jpg", name: "vestido longo chiffon", price: "R$ 890,00" }];

export function Detalhe() {
  return (
    <div className="min-h-[100dvh] bg-white text-[#171614]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <main className="mx-auto w-full max-w-[430px] pb-9">
          <div className="relative h-[60vh] min-h-[390px] max-h-[560px] bg-[#eee9e4]">
           <img src={image("dress-1.jpg")} alt="Vestido acetinado marfim" className="h-full w-full object-cover object-top" />
          <nav className="absolute left-0 right-0 top-0 flex items-center justify-between px-5 pt-7 text-white">
            <button type="button" aria-label="Voltar" onClick={() => window.history.back()} className="flex h-9 w-9 items-center justify-center bg-black/15"><ArrowLeft size={18} strokeWidth={1.25} /></button>
            <button type="button" aria-label="Favoritar" className="flex h-9 w-9 items-center justify-center bg-black/15"><Heart size={17} strokeWidth={1.25} /></button>
          </nav>
          <p className="absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.25em] text-white/90">encontrado para você</p>
        </div>
        <section className="px-5 pt-7">
          <div><h1 className="text-[22px] font-medium tracking-[-0.05em]">vestido midi slip</h1><p className="mt-2 text-[12px] text-[#9a938d]">zara · coleção primavera</p></div>
          <div className="my-7 h-px bg-[#e7e2de]" />
           <p className="text-[28px] font-semibold tracking-[-0.05em]">R$ 299,90</p>
           <dl className="mt-7 space-y-4 text-[12px]"><div className="flex justify-between"><dt className="text-[#9a938d]">material</dt><dd>cetim reciclado</dd></div><div className="flex justify-between"><dt className="text-[#9a938d]">composição</dt><dd>100% poliéster</dd></div><div className="flex justify-between"><dt className="text-[#9a938d]">frete</dt><dd>grátis acima de R$ 199</dd></div></dl>
           <button type="button" onClick={() => window.open("https://www.zara.com", "_blank")} className="mt-8 flex h-14 w-full items-center justify-center gap-2 bg-[#171614] text-[13px] font-medium text-white">Ver na loja <ExternalLink size={14} strokeWidth={1.25} /></button>
          <div className="mt-10 flex items-center justify-between"><h2 className="text-[16px] font-medium tracking-[-0.03em]">Peças similares</h2><button type="button" className="flex items-center text-[11px] text-[#817a73]">ver todas <ChevronRight size={14} strokeWidth={1.2} /></button></div>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">{similar.map((item) => <article key={item.name} className="w-[116px] shrink-0"><img src={image(item.photo)} alt={item.name} className="h-[145px] w-full object-cover object-top" /><p className="mt-2 truncate text-[10px]">{item.name}</p><p className="mt-1 text-[10px] text-[#8f8983]">{item.price}</p></article>)}</div>
        </section>
      </main>
    </div>
  );
}