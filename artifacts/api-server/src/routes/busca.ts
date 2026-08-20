import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, searchesTable, productsTable } from "@workspace/db";
import {
  CreateSearchBody,
  CreateSearchResponse,
  GetSearchResultsParams,
  GetSearchResultsResponse,
} from "@workspace/api-zod";
import {
  parseAttributes,
  extractImageAttributes,
  scoreProduct,
} from "../lib/relevance";

const router = Router();

// POST /busca
router.post("/busca", async (req, res): Promise<void> => {
  const parsed = CreateSearchBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { queryText, imageUrl, lat, lng } = parsed.data;

  // 1. Simulate image-based attribute extraction
  const imageAttrs = extractImageAttributes(imageUrl ?? null);

  // 2. Parse text query — text always overrides image attrs on conflict
  const attrs = parseAttributes(queryText ?? null, imageAttrs);

  const [search] = await db
    .insert(searchesTable)
    .values({
      queryText: queryText ?? null,
      imageUrl: imageUrl ?? null,
      extractedAttributes: JSON.stringify(attrs),
      lat: lat ?? null,
      lng: lng ?? null,
    })
    .returning();

  const response = CreateSearchResponse.parse({
    id: search.id,
    queryText: search.queryText,
    imageUrl: search.imageUrl,
    extractedAttributes: search.extractedAttributes,
    createdAt: search.createdAt.toISOString(),
  });

  res.status(201).json(response);
});

// GET /busca/:searchId/resultados
router.get("/busca/:searchId/resultados", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.searchId)
    ? req.params.searchId[0]
    : req.params.searchId;
  const params = GetSearchResultsParams.safeParse({ searchId: Number(raw) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { searchId } = params.data;

  const [search] = await db
    .select()
    .from(searchesTable)
    .where(eq(searchesTable.id, searchId))
    .limit(1);

  if (!search) {
    res.status(404).json({ error: "Busca não encontrada" });
    return;
  }

  // Parse stored attributes
  let attrs: ReturnType<typeof parseAttributes> = {};
  try {
    attrs = search.extractedAttributes
      ? JSON.parse(search.extractedAttributes)
      : {};
  } catch {
    attrs = {};
  }

  // Load all products + favorites in parallel
  const [products, favoritesRaw] = await Promise.all([
    db.select().from(productsTable),
    db.execute<{ product_id: number }>(`SELECT product_id FROM favorites`),
  ]);

  const favoritedIds = new Set(
    (favoritesRaw as { rows: Array<{ product_id: number }> }).rows.map(
      (r) => r.product_id,
    ),
  );

  // Score every product against the search attributes
  const scored = products.map((p) => ({
    product: p,
    scored: scoreProduct(p, attrs),
  }));

  // Sort: highest score first; ties broken by similarityBase desc
  scored.sort((a, b) => {
    if (b.scored.score !== a.scored.score) return b.scored.score - a.scored.score;
    return b.product.similarityBase - a.product.similarityBase;
  });

  const mappedProducts = scored.map(({ product, scored: s }) => ({
    id: product.id,
    name: product.name,
    category: product.category,
    color: product.color,
    material: product.material,
    imageUrl: product.imageUrl,
    price: product.price,
    priceFormatted: `R$ ${product.price.toFixed(2).replace(".", ",")}`,
    storeName: product.storeName,
    storeType: product.storeType,
    storeUrl: product.storeUrl,
    similarity: Math.round(s.similarity * 100) / 100,
    sponsored: product.sponsored,
    badgeLabel: product.badgeLabel,
    isFavorited: favoritedIds.has(product.id),
  }));

  const response = GetSearchResultsResponse.parse({
    searchId,
    total: mappedProducts.length,
    products: mappedProducts,
  });

  res.json(response);
});

export default router;
