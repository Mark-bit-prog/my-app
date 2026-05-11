import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const numericId = Number(id);

  if (isNaN(numericId)) {
    notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id: numericId },
    include: {
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
        product.reviews.length
      : 0;

  const relatedProducts = await prisma.product.findMany({
    where: {
      id: {
        not: product.id,
      },
      isActive: true,
      ...(product.category && {
        category: product.category,
      }),
    },
    include: {
      reviews: {
        select: {
          rating: true,
        },
      },
    },
    take: 4,
  });

  return (
    <ProductDetailClient
      product={{
        id: product.id,
        name: product.name,
        description: product.description || "No description available",
        price: product.price,
        imageUrl: product.imageUrl,
        stock: product.stock,
        category: product.category,
      }}
      reviews={product.reviews.map((review) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt.toISOString(),
        userName: review.user.name || review.user.email || "Customer",
      }))}
      averageRating={averageRating}
      relatedProducts={relatedProducts.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        rating:
          item.reviews.length > 0
            ? item.reviews.reduce((sum, review) => sum + review.rating, 0) /
              item.reviews.length
            : 0,
      }))}
      isLoggedIn={Boolean(session?.user)}
    />
  );
}
