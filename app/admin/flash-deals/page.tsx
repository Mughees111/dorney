"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";

interface FlashDeal {
  id: string;
  name: string;
  subtitle?: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  emoji?: string;
  tag?: string;
  bgColor?: string;
  accentColor?: string;
  isActive: boolean;
  displayOrder: number;
}

export default function AdminFlashDealsPage() {
  const [deals, setDeals] = useState<FlashDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchDeals = () => {
    fetch("/api/flash-deals", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setDeals(Array.isArray(d) ? d : []))
      .catch(() => setDeals([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This action cannot be undone.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/flash-deals/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setDeals((prev) => prev.filter((d) => d.id !== id));
      } else {
        alert("Failed to delete deal");
      }
    } catch {
      alert("Failed to delete deal");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Flash Deals</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage flash sale deals shown on the homepage
          </p>
        </div>
        <Link
          href="/admin/flash-deals/new"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Add Deal
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Deal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Discount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {deals.map((deal) => (
              <tr key={deal.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {deal.displayOrder}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{deal.emoji || "🎁"}</span>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {deal.name}
                      </div>
                      {deal.subtitle && (
                        <div className="text-sm text-gray-500">
                          {deal.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    Rs. {deal.salePrice}
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    Rs. {deal.originalPrice}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white"
                    style={{ backgroundColor: deal.accentColor || "#FF6B00" }}
                  >
                    -{deal.discount}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      deal.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {deal.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/flash-deals/${deal.id}`}
                      className="text-primary hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(deal.id, deal.name)}
                      disabled={deleting === deal.id}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {deals.length === 0 && (
          <p className="p-8 text-center text-gray-500">
            No flash deals. Add one to show on the homepage.
          </p>
        )}
      </div>
    </div>
  );
}
