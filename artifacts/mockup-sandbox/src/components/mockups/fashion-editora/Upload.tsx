import { useRef, useState } from "react";
import { Camera, ArrowUpRight, Image as ImageIcon } from "lucide-react";

export function Upload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);

  const acceptFile = (file?: File) => {
    if (file) setFileName(file.name);
  };

  return (
    <div className="min-h-[100dvh] bg-[#f7f3ed] text-[#171514]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
      <main className="mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col px-7 pb-10">
        <header className="flex items-center justify-between pt-8">
          <div className="text-[25px] tracking-[-1.5px]" style={{ fontFamily: "'Playfair Display', serif" }}>findfit</div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#8d837b]"><span className="h-1.5 w-1.5 rounded-full bg-[#b7664d]" /> descoberta visual</div>
        </header>
        <section className="pt-[18vh]">
          <p className="mb-5 text-[10px] uppercase tracking-[0.24em] text-[#a36b58]">Seu radar de estilo</p>
          <h1 className="max-w-[350px] text-[48px] leading-[1.06] tracking-[-2.5px]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Vista o que<br /><i>te inspira.</i>
          </h1>
          <p className="mt-6 max-w-[270px] text-[13px] leading-6 text-[#746c66]">Uma imagem basta para encontrar as peças que fazem você parar de rolar.</p>
        </section>
        <section className="mt-12">
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => acceptFile(e.target.files?.[0])} />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); acceptFile(e.dataTransfer.files?.[0]); }}
            className={`flex min-h-[232px] w-full flex-col items-center justify-center border border-dashed transition-colors ${dragging ? "border-[#a75d45] bg-[#f0e7de]" : "border-[#c9bdb1] bg-[#f9f6f1]"}`}
          >
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#c9bdb1] text-[#9b6451]"><Camera size={20} strokeWidth={1.25} /></span>
            <span className="text-[13px]">{fileName || "Solte sua foto aqui"}</span>
            <span className="mt-2 text-[11px] text-[#988d84]">JPG, PNG ou HEIC</span>
          </button>
          <button type="button" onClick={() => inputRef.current?.click()} className="mx-auto mt-5 flex items-center gap-2 border-b border-[#bba99c] pb-1 text-[12px] text-[#625a54]">
            <ImageIcon size={14} strokeWidth={1.5} /> Escolher da galeria
          </button>
        </section>
        <div className="mt-auto pt-14">
          <button type="button" onClick={() => inputRef.current?.click()} className="group flex w-full items-center justify-between bg-[#1e1b19] px-5 py-4 text-[13px] text-[#f8f3eb] transition-transform active:scale-[.98]">
            <span>{fileName ? "Encontrar peças parecidas" : "Começar uma descoberta"}</span>
            <ArrowUpRight size={17} strokeWidth={1.4} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
          <p className="mt-4 text-center text-[10px] tracking-wide text-[#a29890]">inspire-se. encontre. repita.</p>
        </div>
      </main>
    </div>
  );
}