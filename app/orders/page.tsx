import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = session.user;
  const userId = Number(user.id);

  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="flex flex-col gap-2 mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-gray-500">Signed in as</p>
          <h1 className="text-3xl font-bold">
            {user.name || user.email}
          </h1>
        </div>
        <Link className="text-gray-500 hover:text-black" href="/shop">
          Continue shopping
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="border rounded-lg p-8 text-center">
          <h2 className="text-xl font-bold mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6">
            Orders created while you are signed in will appear here.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-full"
          >
            Go to shop
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center">
                <p className="font-bold">#{order.id}</p>
                <p className="text-gray-600">
                  {order.createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-600">{order.status}</p>
                <p className="sm:ml-auto font-bold">
                  ${order.totalPrice.toFixed(2)}
                </p>
              </div>

              <div className="border-t pt-3 flex flex-col gap-2">
                <p className="font-bold text-sm text-gray-500">Order Items:</p>
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 text-sm">
                    <p>{item.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p className="ml-auto">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t mt-3 pt-3 text-sm text-gray-600">
                <p>
                  Delivery to {order.firstName} {order.lastName},{" "}
                  {order.address}, {order.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
