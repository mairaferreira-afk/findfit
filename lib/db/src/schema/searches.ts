import { pgTable, serial, text, doublePrecision, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const searchesTable = pgTable("searches", {
  id: serial("id").primaryKey(),
  queryText: text("query_text"),
  imageUrl: text("image_url"),
  extractedAttributes: text("extracted_attributes"), // JSON string
  lat: doublePrecision("lat"),
  lng: doublePrecision("lng"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertSearchSchema = createInsertSchema(searchesTable).omit({ id: true, createdAt: true });
export type InsertSearch = z.infer<typeof insertSearchSchema>;
export type Search = typeof searchesTable.$inferSelect;
