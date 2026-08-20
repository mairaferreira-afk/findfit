import { Guidelines } from '../parts';

const PHOTOGRAPHY_RULES = [
  { kind: 'do' as const, text: 'Fundo neutro (branco, off-white, bege claro) — a peça deve ser protagonista.' },
  { kind: 'do' as const, text: 'object-cover object-top — a peça centralizada no topo do frame.' },
  { kind: 'do' as const, text: 'Fotografia editorial clean, iluminação suave e difusa.' },
  { kind: 'dont' as const, text: 'Fundo colorido ou texturizado — compete com a peça.' },
  { kind: 'dont' as const, text: 'Border-radius nas imagens de produto — corta a foto de forma artificial.' },
  { kind: 'dont' as const, text: 'Imagens comprimidas ou com crop que prejudica o produto.' },
];

const COMPOSITION_RULES = [
  { kind: 'do' as const, text: 'Hierarquia por escala tipográfica — tamanho e peso criam a hierarquia, não cor.' },
  { kind: 'do' as const, text: 'Botão primário sempre preto sobre branco, sem cor de destaque.' },
  { kind: 'do' as const, text: 'Máximo 3 informações por card: nome, loja e preço.' },
  { kind: 'do' as const, text: 'Tracking negativo (−0.03em a −0.05em) em headlines para aparência editorial.' },
  { kind: 'dont' as const, text: 'Cores vibrantes como CTA — o champagne (#c9b6a1) é decorativo, não funcional.' },
  { kind: 'dont' as const, text: 'Gradientes em qualquer superfície.' },
  { kind: 'dont' as const, text: 'Sombras pesadas — sem sombra ou box-shadow mínimo (4px, 10% opacidade).' },
  { kind: 'dont' as const, text: 'Ícones preenchidos (filled) — sempre outline com strokeWidth 1.2–1.4.' },
];

const COPY_RULES = [
  { kind: 'do' as const, text: 'Nomes de produto e lojas em lowercase — "vestido midi slip", "zara".' },
  { kind: 'do' as const, text: 'Frases diretas: "Encontre a peça que você viu" — sem exclamações.' },
  { kind: 'do' as const, text: 'Preços sempre com R$ e duas casas decimais: "R$ 299,90".' },
  { kind: 'dont' as const, text: 'Exclamações ou emojis na UI principal.' },
  { kind: 'dont' as const, text: 'Uppercase excessivo — reservado ao wordmark "FINDFIT" e badges.' },
  { kind: 'dont' as const, text: 'Copy de startup ("Encontre sua próxima peça favorita AGORA!") — fala com teenager, não com VC.' },
];

export function FindFitGuidelinesDemo() {
  return (
    <div className="space-y-8">
      {/* Princípios */}
      <section className="border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Filosofia de design</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          O FindFit é uma plataforma de descoberta de moda — não um app de e-commerce genérico.
          A interface deve sentir como folhear um lookbook premium: a fotografia das roupas
          é a protagonista absoluta.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            { title: 'Fotografia primeiro', desc: 'As fotos das peças ocupam a maior parte do espaço visual. A UI existe para servir à imagem, nunca para competir com ela.' },
            { title: 'Menos é mais', desc: 'Cada elemento na tela deve ter um motivo para existir. Em dúvida, remova.' },
            { title: 'Hierarquia por escala', desc: 'Tamanho e peso tipográfico criam a hierarquia — não cor, não sombra, não borda.' },
            { title: 'Editorial, não tecnológico', desc: 'A estética se aproxima de uma revista de moda digital, não de um app de startup.' },
          ].map((p) => (
            <div key={p.title} className="border bg-secondary p-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em]">{p.title}</p>
              <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fotografia */}
      <section className="border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Imagens de produto</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Regras para fotografias e uso de imagens nas telas.
        </p>
        <div className="mt-4">
          <Guidelines items={PHOTOGRAPHY_RULES} />
        </div>
      </section>

      {/* Composição */}
      <section className="border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Composição e hierarquia</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Como organizar os elementos visuais para manter a estética editorial.
        </p>
        <div className="mt-4">
          <Guidelines items={COMPOSITION_RULES} />
        </div>
      </section>

      {/* Iconografia */}
      <section className="border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Iconografia — lucide-react</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Todos os ícones usam <code className="text-xs bg-muted px-1 py-0.5">lucide-react</code> com traço fino.
          strokeWidth sempre entre 1.2 e 1.4 — ícones mais espessos quebram a leveza da interface.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 text-sm">
          {[
            { icon: 'ArrowUp', ctx: 'Área de upload', sw: '1.25', sz: '17px' },
            { icon: 'Sparkles', ctx: 'CTA Encontrar', sw: '1.35', sz: '14px' },
            { icon: 'ChevronLeft', ctx: 'Voltar', sw: '1.35', sz: '20px' },
            { icon: 'Heart', ctx: 'Favoritar', sw: '1.25', sz: '16px' },
            { icon: 'SlidersHorizontal', ctx: 'Filtros', sw: '1.3', sz: '18px' },
            { icon: 'ExternalLink', ctx: 'Ver na loja', sw: '1.25', sz: '14px' },
          ].map((ic) => (
            <div key={ic.icon} className="border bg-secondary p-3">
              <p className="text-[11px] font-medium">{ic.icon}</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{ic.ctx}</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.06em] text-accent">sw {ic.sw} · {ic.sz}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tom de comunicação */}
      <section className="border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Tom de comunicação</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Voz elegante e direta — pensa em usuária de 14–25 anos que quer encontrar uma peça
          que viu no Instagram, não ser convencida por copy de marketing.
        </p>
        <div className="mt-4">
          <Guidelines items={COPY_RULES} />
        </div>
      </section>
    </div>
  );
}
