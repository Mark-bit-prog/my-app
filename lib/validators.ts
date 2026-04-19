import { z } from "zod";

// CREATE Product Schema
export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be positive"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean().optional(),
  stock: z.number().int().optional(),
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

// CREATE Order Schema
export const createOrderSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  products: z.array(z.any()).min(1, "At least one product is required"),
});

// UPDATE
export const updateOrderSchema = createOrderSchema.partial();

// PARAMS
export const idOrderSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// TYPES
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;
stock: z.number().int().optional();
