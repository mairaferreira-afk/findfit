import { ArrowRight, ImagePlus, Sparkles } from "lucide-react";
import "./_group.css";

const pink = "#ff4f6d";

export function Upload() {
  const chips = ["📸 Instagram", "📌 Pinterest", "🎬 TikTok", "📺 Série"];
  return (
    <div className="min-h-[100dvh] bg-white text-[#17151a]">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      <main className="mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col px-6 pb-7 pt-8" style={{ fontFamily: "Inter, sans-serif" }}>
        <header className="flex items-center justify-between">
          <div className="text-[28px] font-extrabold tracking-[-1.5px]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            find<span style={{ color: pink }}>fit</span><span className="ml-1 text-xl" style={{ color: "#b7e936" }}>•</span>
          </div>
          <button className="rounded-full border border-[#ece8e9] px-3 py-2 text-xs font-bold text-[#756e72]">Como funciona?</button>
        </header>
        <section className="pt-14">
          <p className="mb-3 text-sm font-bold uppercase tracking-[2px]" style={{ color: pink }}>descubra seu próximo look</p>
          <h1 className="max-w-[350px] text-[45px] font-bold leading-[.98] tracking-[-2.5px]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Viu.<br />Gostou.<br /><span style={{ color: pink }}>Achou.</span>
          </h1>
          <p className="mt-5 max-w-[310px] text-[15px] leading-6 text-[#716a70]">Jogue uma foto aqui e encontre peças iguais — ou com a mesma vibe.</p>
        </section>
        <button className="fashion-pulse mt-10 flex min-h-[255px] flex-col items-center justify-center rounded-[30px] border-2 border-dashed bg-[#fff7f8] px-6" style={{ borderColor: pink }}>
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#ffdce2]"><ImagePlus size={29} strokeWidth={1.8} style={{ color: pink }} /></div>
          <span className="text-lg font-bold">Jogue sua foto aqui</span>
          <span className="mt-1 text-sm text-[#92898e]">solte um print do seu feed</span>
        </button>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {chips.map((chip, i) => <span key={chip} className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-bold ${i === 0 ? "bg-[#17151a] text-white" : "border border-[#e8e3e5] text-[#504950]"}`}>{chip}</span>)}
        </div>
        <div className="mt-auto pt-8">
          <button className="flex h-14 w-full items-center justify-center gap-2 rounded-full text-[15px] font-extrabold text-white shadow-[0_10px_22px_rgba(255,79,109,.23)]" style={{ background: pink }}>
            Buscar looks parecidos <ArrowRight size={18} />
          </button>
          <button className="mx-auto mt-4 flex items-center gap-1 text-xs font-semibold text-[#a49ca0]"><Sparkles size={13} /> ou escolha da galeria</button>
        </div>
      </main>
    </div>
  );
}