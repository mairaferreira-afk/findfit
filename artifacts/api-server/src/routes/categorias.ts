import { Router } from "express";
import { db, categoriesTable } from "@workspace/db";
import { GetCategoriesResponse } from "@workspace/api-zod";

const router = Router();

router.get("/categorias", async (req, res): Promise<void> => {
  const categories = await db.select().from(categoriesTable);
  const response = GetCategoriesResponse.parse(categories);
  res.json(response);
});

export default router;
