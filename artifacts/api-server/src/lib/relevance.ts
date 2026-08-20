/**
 * FindFit relevance engine — attribute extraction + category-first scoring
 */

export interface SearchAttributes {
  categoria?: string;
  comprimento?: string;
  cor?: string;
  material?: string;
  modelagem?: string;
  estilo?: string;
}

// ─── Keyword dictionaries ────────────────────────────────────────────────────

const CATEGORIAS: Record<string, string[]> = {
  vestido: ['vestido', 'dress', 'vestidos'],
  saia: ['saia', 'skirt', 'saias'],
  calca: ['calça', 'calca', 'calças', 'calças', 'pantalone', 'pantalona', 'pants', 'jeans', 'legging'],
  top: ['top', 'blusa', 'blusê', 'bluse', 'camisa', 'camiseta', 'regata', 'cropped', 'crop', 'bandeau', 'corsete'],
  conjunto: ['conjunto', 'set', 'co-ord', 'coord', 'coordenado'],
  jaqueta: ['jaqueta', 'blazer', 'casaco', 'terno', 'alfaiataria'],
  sapato: ['sapato', 'salto', 'scarpin', 'tenis', 'tênis', 'sandália', 'sandalia', 'mule', 'sapatilha', 'bota'],
  bolsa: ['bolsa', 'bag', 'clutch', 'mochila', 'carteira'],
};

const COMPRIMENTOS: Record<string, string[]> = {
  longo: ['longo', 'longa', 'long', 'maxi', 'floor-length'],
  midi: ['midi'],
  curto: ['curto', 'curta', 'mini', 'short'],
  cropped: ['cropped', 'crop'],
  'wide leg': ['wide leg', 'wide-leg', 'pantalona'],
};

const CORES: Record<string, string[]> = {
  branco: ['branco', 'branca', 'white'],
  preto: ['preto', 'preta', 'black'],
  bege: ['bege', 'beige'],
  marfim: ['marfim', 'ivory'],
  champagne: ['champagne', 'champanhe'],
  'off-white': ['off-white', 'offwhite', 'creme', 'cream', 'off white'],
  nude: ['nude'],
  vermelho: ['vermelho', 'vermelha', 'red'],
  azul: ['azul', 'blue'],
  verde: ['verde', 'green'],
  rosa: ['rosa', 'pink'],
  amarelo: ['amarelo', 'amarela', 'yellow'],
  cinza: ['cinza', 'grey', 'gray'],
  marrom: ['marrom', 'brown', 'caramelo'],
  laranja: ['laranja', 'orange'],
  roxo: ['roxo', 'roxa', 'lilás', 'lilas', 'purple', 'violet'],
};

const MATERIAIS: Record<string, string[]> = {
  cetim: ['cetim', 'satin', 'acetinado', 'acetinada'],
  linho: ['linho', 'linen'],
  crepe: ['crepe', 'crêpe'],
  chiffon: ['chiffon', 'cifon'],
  seda: ['seda', 'silk'],
  viscose: ['viscose'],
  algodão: ['algodão', 'algodao', 'cotton'],
  jacquard: ['jacquard'],
  plissado: ['plissado', 'plisse'],
  malha: ['malha', 'knit'],
  veludo: ['veludo', 'velvet'],
  couro: ['couro', 'leather'],
};

/** Normalize a DB color/material value to lowercase for comparison */
function normDB(value: string | null | undefined): string {
  return (value ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/** Normalize a query string */
function normQuery(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function matchFirst<T extends Record<string, string[]>>(
  dict: T,
  text: string,
): string | undefined {
  const normalized = normQuery(text);
  for (const [canonical, keywords] of Object.entries(dict)) {
    if (keywords.some((k) => normalized.includes(normQuery(k)))) {
      return canonical;
    }
  }
  return undefined;
}

// ─── Attribute extraction ─────────────────────────────────────────────────────

/**
 * Extract structured attributes from free text query.
 * If imageAttrs are provided (from image analysis), they fill in any gaps not
 * covered by the text. Text always wins over image attributes on conflict.
 */
export function parseAttributes(
  queryText: string | null,
  imageAttrs: SearchAttributes | null,
): SearchAttributes {
  const result: SearchAttributes = { ...imageAttrs };

  if (!queryText) return result;

  const text = queryText;

  const categoria = matchFirst(CATEGORIAS, text);
  if (categoria) result.categoria = categoria;

  const comprimento = matchFirst(COMPRIMENTOS, text);
  if (comprimento) result.comprimento = comprimento;

  const cor = matchFirst(CORES, text);
  if (cor) result.cor = cor;

  const material = matchFirst(MATERIAIS, text);
  if (material) result.material = material;

  return result;
}

/**
 * Simulate AI image-analysis attribute extraction.
 * In a real app this would call a vision model. Here we return plausible
 * defaults that match our catalogue (neutral dresses, fashion items).
 */
export function extractImageAttributes(imageUrl: string | null): SearchAttributes {
  if (!imageUrl) return {};
  // Simulated: we assume the uploaded image is a fashion piece.
  // In a real product, a vision model classifies the image here.
  return {
    categoria: 'vestido',
    comprimento: 'midi',
    cor: 'branco',
    material: 'cetim',
    estilo: 'minimalista',
  };
}

// ─── Scoring ──────────────────────────────────────────────────────────────────

interface ScoredProduct {
  id: number;
  score: number;
  similarity: number;
}

/**
 * Score a product against extracted search attributes.
 *
 * Point budget:
 *   40 — category exact match (penalty -30 for mismatch when category is known)
 *   20 — subcategory / length match (name-based)
 *   15 — color match
 *   10 — material match
 *   15 — base similarity (seed value × 15)
 */
export function scoreProduct(
  product: {
    id: number;
    category: string | null;
    color: string | null;
    material: string | null;
    name: string;
    similarityBase: number;
  },
  attrs: SearchAttributes,
): ScoredProduct {
  let score = 0;

  // 1. Category — hard gate (highest weight)
  if (attrs.categoria) {
    const dbCat = normDB(product.category);
    const wantedCat = normQuery(attrs.categoria);
    if (dbCat === wantedCat) {
      score += 40;
    } else {
      score -= 30; // wrong category pushed far back
    }
  }

  // 2. Comprimento / subcategory — check product name contains the length keyword
  if (attrs.comprimento) {
    const nameLower = normDB(product.name);
    const compKws = COMPRIMENTOS[attrs.comprimento] ?? [attrs.comprimento];
    if (compKws.some((k) => nameLower.includes(normQuery(k)))) {
      score += 20;
    }
  }

  // 3. Cor
  if (attrs.cor) {
    const dbColor = normDB(product.color);
    const wantedCorKws = CORES[attrs.cor] ?? [attrs.cor];
    const wantedCorNorm = normQuery(attrs.cor);
    if (
      dbColor === wantedCorNorm ||
      dbColor.includes(wantedCorNorm) ||
      wantedCorNorm.includes(dbColor) ||
      wantedCorKws.some((k) => dbColor.includes(normQuery(k)) || normQuery(k).includes(dbColor))
    ) {
      score += 15;
    }
  }

  // 4. Material
  if (attrs.material) {
    const dbMat = normDB(product.material);
    const wantedMatKws = MATERIAIS[attrs.material] ?? [attrs.material];
    if (wantedMatKws.some((k) => dbMat.includes(normQuery(k)))) {
      score += 10;
    }
  }

  // 5. Base similarity (continuous 0–1 → 0–15)
  score += product.similarityBase * 15;

  const similarity = Math.max(0, Math.min(1, score / 100));

  return { id: product.id, score, similarity };
}
