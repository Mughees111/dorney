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

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const paymentColors = {
  pending: "bg-gray-100 text-gray-800",
  paid: "bg-green-100 text-green-800",
  refunded: "bg-orange-100 text-orange-800",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "shipped" | "delivered">("all");

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

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.orderStatus === filter;
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
          <span className="text-sm text-gray-500">
            {filteredOrders.length} order{filteredOrders.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No orders found.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {order.orderNumber}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
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
                    <p className="text-2xl font-bold text-primary">
                      Rs. {order.totalAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()} at{" "}
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Controls */}
              <div className="px-6 py-4 bg-white border-b border-gray-200">
                <div className="flex flex-wrap gap-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-2">
                      Order Status
                    </label>
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateStatus(order.id, "orderStatus", e.target.value)
                      }
                      disabled={updating === order.id}
                      className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${
                        statusColors[order.orderStatus as keyof typeof statusColors] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-2">
                      Payment Status
                    </label>
                    <select
                      value={order.paymentStatus}
                      onChange={(e) =>
                        updateStatus(order.id, "paymentStatus", e.target.value)
                      }
                      disabled={updating === order.id}
                      className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${
                        paymentColors[order.paymentStatus as keyof typeof paymentColors] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="px-6 py-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Order Items</h4>
                <div className="space-y-3">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.productName}</p>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span>Qty: {item.quantity}</span>
                        <span>Rs. {item.price}</span>
                        <span className="font-medium">Rs. {item.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
