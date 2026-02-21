"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload";
import { KeywordsField } from "@/components/admin/KeywordsField";
import {
  inputClass,
  textareaClass,
  formCardClass,
  formSectionClass,
  parseKeywordsInput,
  slugFromName,
} from "@/components/admin/AdminFormStyles";

export default function NewCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    imageUrl: "",
    imageAlt: "",
    metaTitle: "",
    metaDescription: "",
    keywordsInput: "",
  });

  const handleNameChange = (name: string) => {
    const newSlug = slugFromName(name);
    setForm((f) => ({
      ...f,
      name,
      slug: f.slug || newSlug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const keywords = parseKeywordsInput(form.keywordsInput);
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: form.name,
          slug: form.slug || slugFromName(form.name),
          description: form.description || undefined,
          imageUrl: form.imageUrl || undefined,
          imageAlt: form.imageAlt || undefined,
          metaTitle: form.metaTitle || undefined,
          metaDescription: form.metaDescription || undefined,
          keywords,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      router.push("/admin/categories");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Add Category</h1>
      <p className="text-gray-500 mb-8">
        Create a new product category. Categories help organize your products.
      </p>
      <form onSubmit={handleSubmit} className={formCardClass}>
        <div className={formSectionClass}>
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
            <input
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              placeholder="e.g. Cup Cakes"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Slug</label>
            <input
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="Auto-filled from name, editable"
              className={inputClass}
            />
            <p className="text-xs text-gray-500 mt-1">
              URL-friendly version. Auto-generated from name; you can edit it.
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              placeholder="Brief description of this category"
              className={textareaClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Image</label>
            <CloudinaryUpload onUpload={(url) => setForm((f) => ({ ...f, imageUrl: url }))} folder="dorney/categories" />
            {form.imageUrl && (
              <img src={form.imageUrl} alt="Preview" className="mt-3 h-28 w-28 rounded-lg object-cover border border-gray-200" />
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Image Alt (accessibility)</label>
            <input
              value={form.imageAlt}
              onChange={(e) => setForm((f) => ({ ...f, imageAlt: e.target.value }))}
              placeholder="Describe the image for screen readers"
              className={inputClass}
            />
          </div>
          <KeywordsField value={form.keywordsInput} onChange={(v) => setForm((f) => ({ ...f, keywordsInput: v }))} placeholder="cup cakes, fmcg cupcakes, bakery pakistan" />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Meta Title</label>
            <input value={form.metaTitle} onChange={(e) => setForm((f) => ({ ...f, metaTitle: e.target.value }))} placeholder="Optional - for search engine titles" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Meta Description</label>
            <input value={form.metaDescription} onChange={(e) => setForm((f) => ({ ...f, metaDescription: e.target.value }))} placeholder="Optional - for search engine snippets" className={inputClass} />
          </div>
          <button type="submit" disabled={loading} className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors shadow-sm">
            {loading ? "Creating…" : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
}
