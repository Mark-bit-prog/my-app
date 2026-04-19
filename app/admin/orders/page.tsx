import { prisma } from "@/lib/prisma";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      items: true,
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">Orders</h1>

      <div className="mb-4 text-lg">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 mb-4">
            <div className="flex gap-5 mb-4">
              <p className="font-bold">#{order.id}</p>
              <p>
                {order.firstName} {order.lastName}
              </p>
              <p>{order.phone}</p>
              <p>{order.status}</p>
              <p className="ml-auto font-bold">${order.totalPrice}</p>
            </div>

            <div className="border-t pt-3 flex flex-col gap-2">
              <p className="font-bold text-sm text-gray-500">Order Items:</p>
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 text-sm">
                  <p>{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                  <p className="ml-auto">${item.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* {orderItem.map((p) => (
          <div
            key={p.id}
            className="flex-col gap-20 align-baseline mb-4 mt-3 p-4 text-lg"
          >
            <p className="font-bold">Order Info:</p>
            <p>Quantity: {p.quantity}</p>
            <p>Item: {p.name}</p>
            <p>Item price: $ {p.price}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
}
