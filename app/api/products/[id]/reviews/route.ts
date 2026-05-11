import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { idParamSchema } from "@/lib/validators";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const resolvedParams = await params;
  const parsedParams = idParamSchema.safeParse(resolvedParams);

  if (!parsedParams.success) {
    return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
  }

  const body = await request.json();
  const rating = Number(body.rating);
  const comment = typeof body.comment === "string" ? body.comment.trim() : "";

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json(
      { message: "Rating must be between 1 and 5" },
      { status: 400 },
    );
  }

  if (comment.length > 1000) {
    return NextResponse.json(
      { message: "Review comment is too long" },
      { status: 400 },
    );
  }

  const product = await prisma.product.findUnique({
    where: { id: parsedParams.data.id },
    select: { id: true },
  });

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  const review = await prisma.review.create({
    data: {
      productId: product.id,
      userId: Number(session.user.id),
      rating,
      comment: comment || null,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return NextResponse.json(review, { status: 201 });
}
