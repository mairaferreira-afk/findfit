import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, favoritesTable, productsTable } from "@workspace/db";
import {
  CreateFavoriteBody,
  CreateFavoriteResponse,
  DeleteFavoriteParams,
  GetFavoritesResponse,
} from "@workspace/api-zod";

const router = Router();

function formatPrice(price: number): string {
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
}

// GET /favoritos
router.get("/favoritos", async (req, res): Promise<void> => {
  const favs = await db
    .select({
      fav: favoritesTable,
      product: productsTable,
    })
    .from(favoritesTable)
    .innerJoin(productsTable, eq(favoritesTable.productId, productsTable.id))
    .orderBy(favoritesTable.createdAt);

  const response = GetFavoritesResponse.parse(
    favs.map(({ fav, product }) => ({
      id: fav.id,
      productId: fav.productId,
      createdAt: fav.createdAt.toISOString(),
      product: {
        id: product.id,
        name: product.name,
        category: product.category,
        color: product.color,
        material: product.material,
        imageUrl: product.imageUrl,
        price: product.price,
        priceFormatted: formatPrice(product.price),
        storeName: product.storeName,
        storeType: product.storeType,
        storeUrl: product.storeUrl,
        similarity: product.similarityBase,
        sponsored: product.sponsored,
        badgeLabel: product.badgeLabel,
        isFavorited: true,
      },
    })),
  );

  res.json(response);
});

// POST /favoritos
router.post("/favoritos", async (req, res): Promise<void> => {
  const parsed = CreateFavoriteBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  // Upsert: ignore if already favorited
  const existing = await db
    .select()
    .from(favoritesTable)
    .where(eq(favoritesTable.productId, parsed.data.productId))
    .limit(1);

  let fav = existing[0];
  if (!fav) {
    const [inserted] = await db
      .insert(favoritesTable)
      .values({ productId: parsed.data.productId })
      .returning();
    fav = inserted;
  }

  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, fav.productId))
    .limit(1);

  const response = CreateFavoriteResponse.parse({
    id: fav.id,
    productId: fav.productId,
    createdAt: fav.createdAt.toISOString(),
    product: {
      id: product.id,
      name: product.name,
      category: product.category,
      color: product.color,
      material: product.material,
      imageUrl: product.imageUrl,
      price: product.price,
      priceFormatted: formatPrice(product.price),
      storeName: product.storeName,
      storeType: product.storeType,
      storeUrl: product.storeUrl,
      similarity: product.similarityBase,
      sponsored: product.sponsored,
      badgeLabel: product.badgeLabel,
      isFavorited: true,
    },
  });

  res.status(201).json(response);
});

// DELETE /favoritos/:favoriteId
router.delete("/favoritos/:favoriteId", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.favoriteId) ? req.params.favoriteId[0] : req.params.favoriteId;
  const params = DeleteFavoriteParams.safeParse({ favoriteId: Number(raw) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  await db
    .delete(favoritesTable)
    .where(eq(favoritesTable.id, params.data.favoriteId));

  res.status(204).end();
});

export default router;
