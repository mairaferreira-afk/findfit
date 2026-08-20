import { Router } from "express";
import { eq, ne } from "drizzle-orm";
import { db, productsTable } from "@workspace/db";
import {
  GetProductParams,
  GetProductResponse,
  GetFeaturedProductsResponse,
} from "@workspace/api-zod";

const router = Router();

function formatPrice(price: number): string {
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
}

async function getFavoritedIds(): Promise<Set<number>> {
  const result = await db.execute<{ product_id: number }>(
    `SELECT product_id FROM favorites`,
  );
  return new Set((result as { rows: Array<{ product_id: number }> }).rows.map((r) => r.product_id));
}

function mapProduct(p: typeof productsTable.$inferSelect, isFavorited: boolean) {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    color: p.color,
    material: p.material,
    imageUrl: p.imageUrl,
    price: p.price,
    priceFormatted: formatPrice(p.price),
    storeName: p.storeName,
    storeType: p.storeType,
    storeUrl: p.storeUrl,
    similarity: p.similarityBase,
    sponsored: p.sponsored,
    badgeLabel: p.badgeLabel,
    isFavorited,
  };
}

// GET /produtos/destaque
router.get("/produtos/destaque", async (req, res): Promise<void> => {
  const products = await db
    .select()
    .from(productsTable)
    .orderBy(productsTable.similarityBase)
    .limit(8);

  const favoritedIds = await getFavoritedIds();

  const response = GetFeaturedProductsResponse.parse(
    products.map((p) => mapProduct(p, favoritedIds.has(p.id))),
  );

  res.json(response);
});

// GET /produtos/:productId  — must come AFTER /destaque
router.get("/produtos/:productId", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.productId) ? req.params.productId[0] : req.params.productId;
  const params = GetProductParams.safeParse({ productId: Number(raw) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, params.data.productId))
    .limit(1);

  if (!product) {
    res.status(404).json({ error: "Produto não encontrado" });
    return;
  }

  const favoritedIds = await getFavoritedIds();

  // Similar products: same category, different id
  const similar = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.category, product.category ?? "vestido"))
    .limit(6);

  const filteredSimilar = similar
    .filter((p) => p.id !== product.id)
    .slice(0, 5);

  const response = GetProductResponse.parse({
    id: product.id,
    name: product.name,
    category: product.category,
    color: product.color,
    material: product.material,
    composition: product.composition,
    shipping: product.shipping,
    imageUrl: product.imageUrl,
    price: product.price,
    priceFormatted: formatPrice(product.price),
    storeName: product.storeName,
    storeCollection: product.storeCollection,
    storeType: product.storeType,
    storeUrl: product.storeUrl,
    sponsored: product.sponsored,
    isFavorited: favoritedIds.has(product.id),
    similar: filteredSimilar.map((p) => mapProduct(p, favoritedIds.has(p.id))),
  });

  res.json(response);
});

export default router;
