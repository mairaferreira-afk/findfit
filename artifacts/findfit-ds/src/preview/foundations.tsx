import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

// FindFit palette — exact hex values from the source components
const CORE_SWATCHES = [
  { name: 'Primary — #171614', className: 'bg-primary' },
  { name: 'Secondary — #faf9f7', className: 'bg-secondary border' },
  { name: 'Accent — #c9b6a1', className: 'bg-accent' },
] as const;

const SUPPORTING_SWATCHES = [
  { name: 'Background', className: 'bg-background border' },
  { name: 'Foreground', className: 'bg-foreground' },
  { name: 'Card — #f5f2ef', className: 'bg-card border' },
  { name: 'Muted — #eee9e4', className: 'bg-muted border' },
  { name: 'Border — #d9d4cf', className: 'bg-border' },
] as const;

const MUTED_SWATCHES = [
  { name: 'Muted fg — #9a938d', className: 'bg-[#9a938d]' },
  { name: 'Filter text — #77716b', className: 'bg-[#77716b]' },
  { name: 'Divider — #e7e2de', className: 'bg-[#e7e2de] border' },
  { name: 'Input border — #20201e', className: 'bg-[#20201e]' },
] as const;

// FindFit type scale — extracted from the 3 screens
const TYPE_SCALE = [
  { label: 'Wordmark', className: 'text-[13px] font-semibold uppercase tracking-[0.42em]', sample: 'findfit' },
  { label: 'Headline lg', className: 'text-[28px] font-semibold tracking-[-0.05em]', sample: 'R$ 299,90' },
  { label: 'Headline md', className: 'text-[21px] font-medium tracking-[-0.04em]', sample: '24 resultados' },
  { label: 'Body', className: 'text-[15px] font-medium tracking-[-0.01em]', sample: 'Adicionar foto da sua referência' },
  { label: 'Label', className: 'text-[13px] font-medium', sample: 'Ver na loja' },
  { label: 'Caption', className: 'text-[11px] text-muted-foreground', sample: 'peças semelhantes à sua referência' },
  { label: 'Micro', className: 'text-[9px] font-semibold uppercase tracking-[0.06em] text-accent', sample: 'mais parecido' },
  { label: 'Filter', className: 'text-[10px] font-medium uppercase tracking-[0.05em]', sample: 'Todos · Até R$ 500' },
] as const;

const SPACING_SCALE = [
  { label: 'xs — 8px',  className: 'w-2' },
  { label: 'sm — 12px', className: 'w-3' },
  { label: 'md — 20px', className: 'w-5' },
  { label: 'lg — 28px', className: 'w-7' },
  { label: 'xl — 40px', className: 'w-10' },
] as const;

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="space-y-2">
      {/* Square corners by design — radius token is 0 */}
      <div className={`h-16 ${className}`} />
      <p className="text-[11px] font-medium leading-tight">{name}</p>
    </div>
  );
}

export function OverviewPage() {
  return (
    <div className="space-y-4">
      {/* Wordmark strip */}
      <section className="border bg-card p-5 text-card-foreground">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">Sistema de Design</p>
            <p className="mt-2 text-[28px] font-medium tracking-[-0.04em]">findfit</p>
            <div className="mt-1.5 h-px w-12 bg-accent" />
            <p className="mt-3 text-[12px] text-muted-foreground">
              Chic Minimalista — fotografia em protagonismo,<br />DM Sans, paleta neutra quente, cantos zero.
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="h-8 w-8 bg-primary" />
            <div className="h-8 w-8 bg-accent" />
            <div className="h-8 w-8 border bg-secondary" />
          </div>
        </div>
      </section>

      <section className="border bg-card p-5 text-card-foreground">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Paleta principal
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {CORE_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="border bg-card p-5 text-card-foreground">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Tipografia — DM Sans
          </h2>
          <div className="mt-4 space-y-3">
            {TYPE_SCALE.slice(0, 5).map((entry) => (
              <p key={entry.label} className={entry.className}>
                {entry.sample}
              </p>
            ))}
          </div>
        </section>

        <section className="border bg-card p-5 text-card-foreground">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Em uso
          </h2>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>vestido midi slip</CardTitle>
              <CardDescription>
                zara · coleção primavera
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">material</span>
                <span className="text-[11px]">cetim reciclado</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">frete</span>
                <span className="text-[11px]">grátis acima de R$ 199</span>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button className="flex-1">Ver na loja</Button>
              <Button variant="outline">Salvar</Button>
            </CardFooter>
          </Card>
        </section>
      </div>

      <section className="space-y-4 border bg-card p-5 text-card-foreground">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Componentes
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Ver na loja</Button>
          <Button variant="secondary">Salvar</Button>
          <Button variant="outline">Filtros</Button>
          <Button variant="ghost">Ordenar</Button>
          <Badge>mais parecido</Badge>
          <Badge variant="secondary">melhor preço</Badge>
          <Badge variant="outline">Premium</Badge>
        </div>
      </section>
    </div>
  );
}

export function ColorsPage() {
  return (
    <div className="space-y-8 border bg-card p-6 text-card-foreground">
      <section className="space-y-4">
        <div>
          <h2 className="font-semibold">Cores principais</h2>
          <p className="text-sm text-muted-foreground">
            Primary (near-black), Secondary (off-white) e Accent (champagne) — os três pilares da paleta FindFit.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {CORE_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </section>

      <section className="space-y-4 border-t pt-6">
        <div>
          <h2 className="font-semibold">Superfícies e bordas</h2>
          <p className="text-sm text-muted-foreground">
            Backgrounds, cards de produto, muted e cores de borda padrão.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {SUPPORTING_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </section>

      <section className="space-y-4 border-t pt-6">
        <div>
          <h2 className="font-semibold">Texto e dividers</h2>
          <p className="text-sm text-muted-foreground">
            Texto secundário, filtros inativos, divisores, borda forte de upload.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {MUTED_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </section>

      <section className="space-y-3 border-t pt-6">
        <h2 className="font-semibold">O que evitar</h2>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>✗ Cores vibrantes (vermelho, azul, verde, roxo) — não há na paleta</li>
          <li>✗ Gradientes — cores sólidas e planas somente</li>
          <li>✗ Fundo escuro como tema principal — light mode exclusivo no app</li>
          <li>✗ CTA colorido — o botão primário é sempre preto sobre branco</li>
        </ul>
      </section>
    </div>
  );
}

export function FontsPage() {
  return (
    <div className="space-y-8 border bg-card p-6 text-card-foreground">
      <section>
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Família tipográfica
        </h2>
        <p className="mt-4 text-[32px] font-medium tracking-[-0.04em]">DM Sans</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Única família em todo o FindFit. Sans-serif moderna, ligeiramente geométrica —
          elegante sem ser fria, funcional sem ser genérica.
        </p>
        <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
          <span>400 Regular</span>
          <span>500 Medium</span>
          <span>600 SemiBold</span>
        </div>
      </section>

      <section className="space-y-5 border-t pt-6">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Escala tipográfica FindFit
        </h2>
        {TYPE_SCALE.map((entry) => (
          <div key={entry.label} className="grid gap-1.5 sm:grid-cols-[108px_1fr]">
            <span className="pt-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              {entry.label}
            </span>
            <p className={entry.className}>{entry.sample}</p>
          </div>
        ))}
      </section>

      <section className="space-y-3 border-t pt-6">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Convenções
        </h2>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>Nomes de produto e lojas: sempre <strong className="text-foreground">lowercase</strong></li>
          <li>Wordmark "findfit": sempre lowercase</li>
          <li>Tracking negativo (−0.03em a −0.05em) em headlines para aparência editorial</li>
          <li>Uppercase reservado ao wordmark, badges e labels de seção</li>
        </ul>
      </section>
    </div>
  );
}

export function LayoutPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Espaçamento</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Escala derivada do base spacing token (4px). Vertical rhythm das telas.
        </p>
        <div className="mt-6 space-y-4">
          {SPACING_SCALE.map((space) => (
            <div key={space.label} className="flex items-center gap-4">
              <span className="w-20 text-xs text-muted-foreground shrink-0">
                {space.label}
              </span>
              <div className={`h-3 bg-primary ${space.className}`} />
            </div>
          ))}
        </div>
        <div className="mt-6 border-t pt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Grid de produto</p>
          <p className="mt-2 text-sm text-muted-foreground">
            2 colunas · gap-x 12px · gap-y 28px · max-width 430px · px 20px
          </p>
        </div>
      </section>

      <section className="border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Border radius — zero</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Cantos quadrados em todos os elementos. A ausência de arredondamento é
          intencional — reforça a estética editorial, não de startup.
        </p>
        <div className="mt-6 space-y-3">
          {[
            { label: 'Botão primário', preview: 'flex h-14 w-full items-center justify-center bg-primary text-[13px] font-medium text-primary-foreground' },
            { label: 'Botão outline', preview: 'flex h-12 w-full items-center justify-center border border-foreground text-[13px] font-medium' },
            { label: 'Card de produto', preview: 'h-24 w-full border bg-card' },
            { label: 'Chip de filtro', preview: 'inline-flex items-center border border-foreground px-3 py-1.5 text-[10px] font-medium' },
          ].map((item) => (
            <div key={item.label}>
              <p className="mb-1.5 text-xs text-muted-foreground">{item.label}</p>
              <div className={item.preview}>
                {item.label === 'Botão primário' && 'Ver na loja'}
                {item.label === 'Botão outline' && 'Filtros'}
                {item.label === 'Chip de filtro' && 'Todos'}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
