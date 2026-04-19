import { prisma } from "@/lib/prisma";
import {
  createProductSchema,
  idParamSchema,
  updateProductSchema,
} from "@/lib/validators";
import { NextResponse } from "next/server";

export const renewProductSchema = createProductSchema.partial();

// UPDATE
// export async function PATCH(req: Request, { params }: any) {
//   const body = await req.json();

//   const product = await prisma.product.update({
//     where: { id: Number(params.id) },
//     data: body,
//   });

//   return NextResponse.json(product);
// }

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedParams = await params;
  const parsedParams = idParamSchema.safeParse(resolvedParams);

  if (!parsedParams.success) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await req.json();

  const parsedBody = updateProductSchema.safeParse({
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

// DELETE
// export async function DELETE(req: Request, { params }: any) {
//   await prisma.product.delete({
//     where: { id: Number(params.id) },
//   });

//   return NextResponse.json({ success: true });
// }

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedParams = await params;
  const parsedParams = idParamSchema.safeParse(resolvedParams);

  if (!parsedParams.success) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  await prisma.product.delete({
    where: { id: parsedParams.data.id },
  });

  return NextResponse.json({ success: true });
}
