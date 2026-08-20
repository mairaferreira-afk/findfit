import { pgTable, serial, text, doublePrecision, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { storesTable } from "./stores";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category"),       // vestido, top, saia, conjunto
  color: text("color"),             // branco, marfim, champagne…
  material: text("material"),
  composition: text("composition"),
  imageUrl: text("image_url").notNull(),
  price: doublePrecision("price").notNull(),
  storeId: integer("store_id").references(() => storesTable.id),
  storeName: text("store_name").notNull(),
  storeType: text("store_type"),
  storeUrl: text("store_url"),
  storeCollection: text("store_collection"),
  shipping: text("shipping"),
  sponsored: boolean("sponsored").notNull().default(false),
  badgeLabel: text("badge_label"),
  similarityBase: doublePrecision("similarity_base").notNull().default(0.9),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({ id: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;
