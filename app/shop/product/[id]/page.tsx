import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

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
  });

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1>Product Page</h1>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
}
