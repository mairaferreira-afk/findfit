import { useRef, useState } from "react";
import { ArrowUp, ImagePlus, Sparkles } from "lucide-react";

const img = (name: string) => `/__mockup/images/${name}`;

export function Upload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);

  const chooseFile = (file?: File) => {
    if (file) setFileName(file.name);
  };

  return (
    <div className="min-h-[100dvh] bg-white text-[#161513]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <main className="mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col px-6 pb-9 pt-10">
        <header className="text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.42em]">findfit</p>
          <div className="mx-auto mt-3 h-px w-8 bg-[#c9b6a1]" />
        </header>
        <section className="mt-[17vh]">
          <h1 className="text-center text-[25px] font-medium tracking-[-0.055em]">Encontre a peça que você viu</h1>
          <p className="mt-2 mb-7 text-center text-[12px] text-[#9a938d]">Envie uma foto e encontre peças semelhantes para comprar.</p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); chooseFile(e.dataTransfer.files[0]); }}
            className={`flex h-[242px] w-full flex-col items-center justify-center border border-dashed border-[#20201e] bg-[#faf9f7] transition-colors ${dragging ? "bg-[#eee8e1]" : ""}`}
          >
            <div className="mb-4 flex h-[78px] w-[58px] overflow-hidden border border-[#e2ddd8] bg-white">
              <img src={img("ref-vestido.jpg")} alt="Exemplo de referência" className="h-full w-full object-cover object-top" />
            </div>
            <span className="mb-1 flex items-center gap-2 text-[14px] font-medium"><ArrowUp size={15} strokeWidth={1.25} />{fileName || "Solte a foto aqui"}</span>
            <span className="mt-2 text-[11px] tracking-[0.05em] text-[#8b857e]">JPG, PNG · até 10 MB</span>
          </button>
          <input ref={inputRef} className="hidden" type="file" accept="image/*" onChange={(e) => chooseFile(e.target.files?.[0])} />
          <div className="my-8 flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-[#aaa39c]">
            <span className="h-px flex-1 bg-[#e7e3df]" /><span>ou</span><span className="h-px flex-1 bg-[#e7e3df]" />
          </div>
          <button type="button" onClick={() => inputRef.current?.click()} className="flex h-12 w-full items-center justify-center gap-2 border border-[#1d1c1a] text-[13px] font-medium transition-colors hover:bg-[#f7f4f1]">
            <ImagePlus size={16} strokeWidth={1.4} /> Escolher da galeria
          </button>
          <button type="button" onClick={() => { window.location.href = "/__mockup/preview/fashion-chic/Resultados"; }} className="mt-3 flex h-12 w-full items-center justify-center gap-2 bg-[#171614] text-[13px] font-medium text-white transition-opacity hover:opacity-85">
            Encontrar peças <Sparkles size={14} strokeWidth={1.35} />
          </button>
        </section>
        <p className="mt-auto pt-14 text-center text-[11px] leading-5 text-[#aaa39c]">A imagem é usada apenas para encontrar<br />o seu próximo look.</p>
      </main>
    </div>
  );
}