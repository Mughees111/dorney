"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  category: string;
  displayOrder: number;
  isActive: boolean;
}

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/faqs", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setFaqs(Array.isArray(d) ? d : []))
      .catch(() => setFaqs([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string, question: string) => {
    if (!confirm(`Delete "${question}"? This action cannot be undone.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/faqs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setFaqs((prev) => prev.filter((f) => f.id !== id));
      } else {
        alert("Failed to delete FAQ");
      }
    } catch {
      alert("Failed to delete FAQ");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">FAQs</h1>
        <Link
          href="/admin/faqs/new"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Add FAQ
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Question</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Active</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {faqs.map((f) => (
              <tr key={f.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{f.displayOrder}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{f.question}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{f.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{f.isActive ? "Yes" : "No"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/faqs/${f.id}`} className="text-primary hover:underline">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(f.id, f.question)}
                      disabled={deleting === f.id}
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
        {faqs.length === 0 && (
          <p className="p-8 text-center text-gray-500">
            No FAQs. Add some to help customers.
          </p>
        )}
      </div>
    </div>
  );
}