"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload";

export default function EditHeroSlidePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    imageUrl: "",
    imageAlt: "",
    displayOrder: "0",
  });

  useEffect(() => {
    fetch(`/api/hero-slides/${id}`, { credentials: "include" })
      .then((r) => r.json())
      .then((slide) => {
        if (slide?.id) {
          setForm({
            title: slide.title ?? "",
            subtitle: slide.subtitle ?? "",
            description: slide.description ?? "",
            imageUrl: slide.imageUrl ?? "",
            imageAlt: slide.imageAlt ?? "",
            displayOrder: String(slide.displayOrder ?? 0),
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await fetch(`/api/hero-slides/${id}`, {
        method: "PUT",
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
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/hero" className="text-gray-600 hover:text-gray-900">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold">Edit Hero Slide</h1>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl space-y-4">
        {error && <p className="text-red-600">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title *</label>
          <input
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            required
            className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Subtitle</label>
          <input
            value={form.subtitle}
            onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
            className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" title="Order in carousel (lower = first)">Display Order</label>
          <input
            type="number"
            value={form.displayOrder}
            onChange={(e) => setForm((f) => ({ ...f, displayOrder: e.target.value }))}
            className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <CloudinaryUpload
            onUpload={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
            folder="dorney/hero"
          />
          {form.imageUrl && (
            <img src={form.imageUrl} alt="Preview" className="mt-2 h-32 rounded object-cover" />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image Alt</label>
          <input
            value={form.imageAlt}
            onChange={(e) => setForm((f) => ({ ...f, imageAlt: e.target.value }))}
            className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </form>
    </div>
  );
}
