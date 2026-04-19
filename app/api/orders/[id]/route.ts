import { prisma } from "@/lib/prisma";
import {
  idOrderSchema,
  createOrderSchema,
  updateOrderSchema,
} from "@/lib/validators";
import { NextResponse } from "next/server";

export const renewOrderSchema = createOrderSchema.partial();

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedParams = await params;
  const parsedParams = idOrderSchema.safeParse(resolvedParams);

  if (!parsedParams.success) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await req.json();

  const parsedBody = updateOrderSchema.safeParse({
    ...body,
    price: body.price ? Number(body.price) : undefined,
  });

  if (!parsedBody.success) {
    return NextResponse.json(
      { error: parsedBody.error.format() },
      { status: 400 },
    );
  }

  const product = await prisma.product.update({
    where: { id: parsedParams.data.id },
    data: parsedBody.data,
  });

  return NextResponse.json(product);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedParams = await params;
  const parsedParams = idOrderSchema.safeParse(resolvedParams);

  if (!parsedParams.success) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  await prisma.product.delete({
    where: { id: parsedParams.data.id },
  });

  return NextResponse.json({ success: true });
}
