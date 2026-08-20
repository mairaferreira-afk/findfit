# FindFit — Design System

> Design system oficial do FindFit. Versão 1.0 — direção Chic Minimalista.

---

## Filosofia de Design

O FindFit é uma plataforma de descoberta de moda — não um app de e-commerce genérico nem uma ferramenta de IA. A interface deve sentir como folhear um lookbook premium: a fotografia das roupas é a protagonista absoluta, e cada elemento de UI existe para servir à imagem, nunca para competir com ela.

**Princípios:**
- **Fotografia primeiro** — as fotos das peças ocupam a maior parte do espaço visual
- **Menos é mais** — cada elemento na tela deve ter um motivo para existir
- **Hierarquia por escala** — a hierarquia é criada por tamanho e peso tipográfico, não por cor
- **Editorial, não tecnológico** — a estética se aproxima de uma revista de moda digital, não de um app de startup

---

## Paleta de Cores

### Cores Base

| Nome | Hex | Uso |
|------|-----|-----|
| `white` | `#FFFFFF` | Fundo principal de todas as telas |
| `off-white` | `#FAF9F7` | Fundo de área de upload, fundo de cards de produto |
| `near-black` | `#171614` | Texto principal, botão primário preenchido, wordmark |
| `warm-black` | `#161513` | Variante alternativa do texto principal |

### Cores de Texto

| Nome | Hex | Uso |
|------|-----|-----|
| `text-primary` | `#171614` | Títulos, nomes de produtos, preços |
| `text-secondary` | `#9A938D` | Loja, coleção, metadata |
| `text-muted` | `#8B857E` | Labels de formato (JPG, PNG), hints |
| `text-caption` | `#AAA39C` | Rodapé, textos de contexto legais |
| `text-filter-inactive` | `#77716B` | Chips de filtro não selecionados |

### Cores de Borda e Divider

| Nome | Hex | Uso |
|------|-----|-----|
| `border-strong` | `#20201E` | Borda da área de upload (dashed) |
| `border-default` | `#D9D4CF` | Chips de filtro inativos, bordas de botão outline |
| `border-light` | `#E7E2DE` | Dividers, separadores de seção |
| `border-muted` | `#D7D1CA` | Ícones com borda circular |

### Acento

| Nome | Hex | Uso |
|------|-----|-----|
| `accent-champagne` | `#C9B6A1` | Decoração do wordmark (linha divisória), badges sutis |

### O que evitar
- ❌ Nenhuma cor vibrante (vermelho, azul, verde, roxo)
- ❌ Nenhum gradiente
- ❌ Nenhum fundo escuro como tema principal
- ❌ Cores de destaque para CTA — o botão primário é sempre preto sobre branco

---

## Tipografia

### Família
**DM Sans** — sans-serif moderna e elegante. Única família tipográfica em todo o app.

```
import url: https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap
```

### Escala

| Token | Tamanho | Peso | Tracking | Uso |
|-------|---------|------|----------|-----|
| `wordmark` | 13px | 600 (semibold) | 0.42em | Nome do app "findfit" |
| `headline-lg` | 23–28px | 500 (medium) | -0.05em | Preço em destaque (Detalhe) |
| `headline-md` | 20–23px | 500 (medium) | -0.04em | Título da peça, contagem de resultados |
| `body` | 15px | 500 (medium) | -0.01em | Copy principal, labels de ação |
| `label` | 12–13px | 400–500 | 0 | Informações de produto, corpo de cards |
| `caption` | 10–11px | 400 | 0–0.05em | Loja, metadata, hints |
| `micro` | 9px | 600 | 0.06em | Badges (uppercase) |
| `filter` | 10px | 400–500 | 0 | Chips de filtro |

### Convenções
- Nomes de produto e lojas aparecem em **lowercase**
- O wordmark `findfit` sempre em lowercase
- Títulos de seção: case normal, sem uppercase (exceto wordmark e badges)
- Tracking negativo (-0.03em a -0.05em) em headlines para aparência editorial

---

## Espaçamento & Layout

### Container
```
max-width: 430px
padding-x: 20–24px (px-5 ou px-6)
```

### Grid de Produto (Resultados)
```
grid-cols: 2
gap-x: 12px (gap-x-3)
gap-y: 28px (gap-y-7)
```

### Escala de Espaço Vertical

| Token | Valor | Uso típico |
|-------|-------|-----------|
| `space-xs` | 8px (mt-2) | Entre nome e loja no card |
| `space-sm` | 12px (mt-3) | Entre imagem e info do card |
| `space-md` | 16–20px (mt-4 a mt-5) | Separação de sub-seções |
| `space-lg` | 28px (mt-7) | Entre header e conteúdo principal |
| `space-xl` | 32–40px (mt-8 a mt-10) | Entre seções maiores |

---

## Componentes

### Botão Primário (CTA)

```
altura: 48–56px (h-12 a h-14)
width: 100%
background: #171614
color: #FFFFFF
font-size: 13px
font-weight: 500
border-radius: 0 (sem arredondamento)
```

Variação com ícone: gap de 8px entre texto e ícone (size 14, strokeWidth 1.25)

### Botão Outline (Secundário)

```
altura: 48px (h-12)
width: 100%
background: transparent
border: 1px solid #1D1C1A
color: #171614
font-size: 13px
font-weight: 500
border-radius: 0
```

### Chip de Filtro

```
padding: 6px 12px (py-1.5 px-3)
font-size: 10px
border-radius: 0
border: 1px solid

Estado ativo: border-color #171614, font-weight 500
Estado inativo: border-color #D9D4CF, color #77716B
```

### Card de Produto

```
background imagem: #F5F2EF (placeholder)
border-radius: 0
imagem: object-cover, object-top
altura da imagem: 224px (grid 2 colunas)

Info abaixo:
- mt-3 (12px) entre imagem e texto
- Nome: 12px, font-medium, lowercase
- Loja: 10px, mt-1, color #97918B, lowercase
- Preço: 11px, font-medium, alinhado à direita
```

**Ícone coração (favorito):**
```
posição: absolute, top-right (top-3 right-3)
fundo: rgba(white, 0.85)
tamanho container: 32×32px
ícone: Heart, size 16, strokeWidth 1.25
```

**Badge (opcional):**
```
font-size: 9px
font-weight: 600
uppercase
letter-spacing: 0.06em
color: #C9B6A1
```

### Área de Upload

```
height: 242px
width: 100%
background: #FAF9F7
border: 1px dashed #20201E
border-radius: 0
layout: flex, column, items-center, justify-center

Ícone:
- container: 44×44px, border 1px solid #D7D1CA, rounded-full
- ícone: ArrowUp, size 17, strokeWidth 1.25

Texto principal: 15px, font-medium
Subtexto: 11px, tracking 0.05em, color #8B857E
```

### Divider / Separador

```
height: 1px
background: #E7E2DE
margin: 28px 0 (my-7)
```

### Barra de Navegação (Sobre foto — Detalhe)

```
posição: absolute, top-0, full-width
padding: 28px top, 20px horizontal
botões: 36×36px, background rgba(0,0,0,0.15)
ícones: 17–18px, strokeWidth 1.25, color white
```

---

## Iconografia

**Biblioteca:** `lucide-react`

| Ícone | strokeWidth | Tamanho | Contexto |
|-------|-------------|---------|----------|
| `ArrowUp` | 1.25 | 17px | Upload area |
| `ImagePlus` | 1.4 | 16px | Galeria |
| `Sparkles` | 1.35 | 14px | CTA encontrar |
| `ChevronLeft` | 1.35 | 20px | Voltar (Resultados) |
| `SlidersHorizontal` | 1.3 | 18px | Filtros |
| `ArrowDownUp` | 1.3 | 13px | Ordenar |
| `Heart` | 1.25 | 16–17px | Favoritar |
| `ArrowLeft` | 1.25 | 18px | Voltar (Detalhe) |
| `ExternalLink` | 1.25 | 14px | Ver na loja |
| `ChevronRight` | 1.2 | 14px | Ver todas |

**Regra:** strokeWidth sempre entre 1.2 e 1.4 — ícones com traço fino reforçam a estética minimalista.

---

## Imagens de Produto

- Fundo neutro (branco, off-white, bege claro) — nunca fundo colorido
- Fotografia editorial clean, iluminação suave
- As fotos são `object-cover object-top` — a peça deve estar centrada no topo
- Sem bordas, sem border-radius nas imagens de produto
- A imagem é o principal elemento visual — nunca comprimir ou cortar de forma que prejudique o produto

---

## Padrões de Interação

- **Links entre telas** usam `window.location.href` (não router, pois é protótipo)
- **Drag & drop** na área de upload com feedback visual de estado
- **Scroll horizontal** em filtros e peças similares com `overflow-x-auto` e `::-webkit-scrollbar: hidden`
- **Hover states** sutis: `hover:opacity-85` em botão primário, `hover:bg-[#f7f4f1]` em botão outline

---

## Tom de Comunicação (Copy)

- Voz: elegante, direta, sem exagero
- Sem exclamações, sem emojis na UI principal
- Lowercase consistente em nomes de produtos e lojas
- Frases curtas: "Encontre a peça que você viu" — não "Encontre sua próxima peça favorita agora!"
- Preços sempre com R$ e duas casas decimais

---

## O Que Evitar

| ❌ Evitar | ✅ Prefira |
|----------|----------|
| Border-radius grande (pill/rounded-xl) | Sem raio ou raio mínimo |
| Cores de destaque vibrantes | Preto sobre branco como CTA |
| Gradientes | Cores sólidas e planas |
| Sombras pesadas | Sem sombra ou sombra muito sutil |
| Uppercase em excesso | Uppercase apenas no wordmark e badges |
| Cards poluídos com muita info | 3 informações máximo por card |
| Fundo escuro | Fundo branco puro |
| Elementos 3D ou skeuomorfismo | Flat, sem profundidade artificial |
| Ícones preenchidos | Ícones com traço fino (outline) |
| Excesso de animação | Transições sutis e funcionais |
