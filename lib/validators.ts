import { z } from "zod";

// CREATE
export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be positive"),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

// UPDATE
export const updateProductSchema = createProductSchema.partial();

// PARAMS
export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// TYPES
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
