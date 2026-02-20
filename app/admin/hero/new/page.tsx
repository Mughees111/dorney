"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload";

export default function NewHeroSlidePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    imageUrl: "",
    imageAlt: "",
    displayOrder: "0",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/hero-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: form.title,
          subtitle: form.subtitle || undefined,
          description: form.description || undefined,
          imageUrl: form.imageUrl || undefined,
          imageAlt: form.imageAlt || undefined,
          displayOrder: parseInt(form.displayOrder, 10) || 0,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      router.push("/admin/hero");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add Hero Slide</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl space-y-4">
        {error && <p className="text-red-600">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title *</label>
          <input
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            required
            className="mt-1 block w-full rounded border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Subtitle</label>
          <input
            value={form.subtitle}
            onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
            className="mt-1 block w-full rounded border-gray-300"
          />
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
          <label className="block text-sm font-medium text-gray-700" title="Upload to Cloudinary">Image</label>
          <CloudinaryUpload
            onUpload={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
            folder="dorney/hero"
          />
          {form.imageUrl && (
            <img src={form.imageUrl} alt="Preview" className="mt-2 h-32 rounded object-cover" />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image Alt (accessibility)</label>
          <input
            value={form.imageAlt}
            onChange={(e) => setForm((f) => ({ ...f, imageAlt: e.target.value }))}
            className="mt-1 block w-full rounded border-gray-300"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Saving…" : "Create Slide"}
        </button>
      </form>
    </div>
  );
}
