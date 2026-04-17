import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createProductSchema } from "@/lib/validators";

// GET (всі товари)
// export async function GET() {
//   const products = await prisma.product.findMany({
//     orderBy: { createdAt: "desc" },
//   });

//   return NextResponse.json(products);
// }
export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

// POST (створити товар)
// export async function POST(req: Request) {
//   const body = await req.json();

//   const parsed = createProductSchema.safeParse(body);

//   if (!parsed.success) {
//     return Response.json({ error: parsed.error.format() }, { status: 400 });
//   }

//   const product = await prisma.product.create({
//     data: parsed.data,
//   });

//   return Response.json(product);
// }

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = createProductSchema.safeParse({
    ...body,
    price: Number(body.price),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: parsed.data,
  });

  return NextResponse.json(product);
}
