import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { productsTable } from "./products";

export const favoritesTable = pgTable("favorites", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => productsTable.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertFavoriteSchema = createInsertSchema(favoritesTable).omit({ id: true, createdAt: true });
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type Favorite = typeof favoritesTable.$inferSelect;
