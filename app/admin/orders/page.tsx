"use client";

import { useEffect, useState } from "react";

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress?: string;
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
  items: OrderItem[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/orders", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setOrders(Array.isArray(d) ? d : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (
    id: string,
    field: "orderStatus" | "paymentStatus",
    value: string
  ) => {
    setUpdating(id);
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ [field]: value }),
      });
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id ? { ...o, [field]: value } : o
        )
      );
    } finally {
      setUpdating(null);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <div className="space-y-6">
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex flex-wrap justify-between gap-4 mb-4">
                <div>
                  <p className="font-semibold text-gray-900">
                    {order.orderNumber}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.customerName} • {order.customerPhone}
                  </p>
                  {order.customerEmail && (
                    <p className="text-sm text-gray-600">{order.customerEmail}</p>
                  )}
                  {order.customerAddress && (
                    <p className="text-sm text-gray-600">{order.customerAddress}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">
                    Rs. {order.totalAmount}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mb-4">
                <div>
                  <label className="text-xs text-gray-500">Order Status</label>
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      updateStatus(order.id, "orderStatus", e.target.value)
                    }
                    disabled={updating === order.id}
                    className="ml-2 rounded border-gray-300 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Payment</label>
                  <select
                    value={order.paymentStatus}
                    onChange={(e) =>
                      updateStatus(order.id, "paymentStatus", e.target.value)
                    }
                    disabled={updating === order.id}
                    className="ml-2 rounded border-gray-300 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Product</th>
                    <th className="text-right py-2">Qty</th>
                    <th className="text-right py-2">Price</th>
                    <th className="text-right py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2">{item.productName}</td>
                      <td className="text-right">{item.quantity}</td>
                      <td className="text-right">Rs. {item.price}</td>
                      <td className="text-right">Rs. {item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
