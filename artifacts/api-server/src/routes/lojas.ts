import { Router } from "express";
import { db, storesTable, productsTable } from "@workspace/db";
import { GetNearbyStoresResponse } from "@workspace/api-zod";
import { eq } from "drizzle-orm";

const router = Router();

// GET /lojas/proximas
router.get("/lojas/proximas", async (req, res): Promise<void> => {
  const stores = await db.select().from(storesTable);

  // Count products per store
  const productCounts = await db
    .select({ storeId: productsTable.storeId })
    .from(productsTable);

  const countMap = new Map<number, number>();
  for (const { storeId } of productCounts) {
    if (storeId != null) {
      countMap.set(storeId, (countMap.get(storeId) ?? 0) + 1);
    }
  }

  // Simulate distances (user lat/lng could come from query params in a real app)
  const storesWithDistance = stores.map((s, i) => ({
    id: s.id,
    name: s.name,
    type: s.type,
    url: s.url,
    address: s.address,
    latitude: s.latitude,
    longitude: s.longitude,
    distanceKm: +(0.3 + i * 0.4).toFixed(1),
    productCount: countMap.get(s.id) ?? 0,
  }));

  storesWithDistance.sort((a, b) => a.distanceKm - b.distanceKm);

  const response = GetNearbyStoresResponse.parse(storesWithDistance);
  res.json(response);
});

export default router;
