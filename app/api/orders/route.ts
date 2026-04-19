import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { OrderBody } from "@/types";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const body: OrderBody = await request.json();

  const userId = session?.user?.id ? Number(session.user.id) : undefined;

  const order = await prisma.order.create({
    data: {
      ...(userId !== undefined && { userId }),
      totalPrice: body.totalPrice,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      address: body.address,
      city: body.city,
      items: {
        create: body.items.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
      },
    } as Prisma.OrderUncheckedCreateInput,
  });

  return Response.json(order);
}
// const order = await prisma.order.create({ data });

//   return Response.json(order);
// }
