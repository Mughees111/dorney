"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewFAQPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "general",
    displayOrder: "0",
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          question: form.question,
          answer: form.answer,
          category: form.category,
          displayOrder: parseInt(form.displayOrder, 10) || 0,
          isActive: form.isActive,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      router.push("/admin/faqs");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add FAQ</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl space-y-4">
        {error && <p className="text-red-600">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-700">Question *</label>
          <input
            value={form.question}
            onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
            required
            className="mt-1 block w-full rounded border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Answer *</label>
          <textarea
            value={form.answer}
            onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
            required
            rows={4}
            className="mt-1 block w-full rounded border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="mt-1 block w-full rounded border-gray-300"
          >
            <option value="general">General</option>
            <option value="retailer">Retailer</option>
            <option value="customer">Customer</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" title="Display order (lower = first)">Display Order</label>
          <input
            type="number"
            value={form.displayOrder}
            onChange={(e) => setForm((f) => ({ ...f, displayOrder: e.target.value }))}
            className="mt-1 block w-full rounded border-gray-300"
          />
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
              className="mr-2"
            />
            Active
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Saving…" : "Create FAQ"}
        </button>
      </form>
    </div>
  );
}