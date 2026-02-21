"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload";
import { KeywordsField } from "@/components/admin/KeywordsField";
import {
  inputClass,
  textareaClass,
  selectClass,
  formCardClass,
  formSectionClass,
  parseKeywordsInput,
  slugFromName,
} from "@/components/admin/AdminFormStyles";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    slug: "",
    categoryId: "",
    shortDescription: "",
    description: "",
    price: "",
    featured: false,
    image: "",
    imageAlt: "",
    metaTitle: "",
    metaDescription: "",
    keywordsInput: "",
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/categories", { credentials: "include" }).then((r) => r.json()),
      fetch(`/api/products/${id}`, { credentials: "include" }).then((r) => r.json()),
    ]).then(([cats, product]) => {
      setCategories(Array.isArray(cats) ? cats : []);
      if (product?.id) {
        const kw = Array.isArray(product.keywords) ? product.keywords : [];
        setForm({
          name: product.name ?? "",
          slug: product.slug ?? "",
          categoryId: product.categoryId ?? product.category?.id ?? "",
          shortDescription: product.shortDescription ?? "",
          description: product.description ?? "",
          price: String(product.price ?? ""),
          featured: product.featured ?? false,
          image: product.image ?? "",
          imageAlt: product.imageAlt ?? "",
          metaTitle: product.metaTitle ?? "",
          metaDescription: product.metaDescription ?? "",
          keywordsInput: kw.join(", "),
        });
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

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
    setSaving(true);
    try {
      const price = parseFloat(form.price);
      if (isNaN(price) || price <= 0) {
        setError("Price must be a positive number (PKR)");
        return;
      }
      const keywords = parseKeywordsInput(form.keywordsInput);
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: form.name,
          slug: form.slug || slugFromName(form.name),
          categoryId: form.categoryId,
          shortDescription: form.shortDescription || undefined,
          description: form.description || undefined,
          price,
          featured: form.featured,
          image: form.image || undefined,
          imageAlt: form.imageAlt || undefined,
          metaTitle: form.metaTitle || undefined,
          metaDescription: form.metaDescription || undefined,
          keywords,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      router.push("/admin/products");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setSaving(false);
    }
  };

  const addImage = (url: string) => {
    setForm((f) => ({
      ...f,
      image: url,
    }));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );

  return (
    <div className="max-w-3xl">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Product</h1>
      <p className="text-gray-500 mb-8">Update product details.</p>
      <form onSubmit={handleSubmit} className={formCardClass}>
        <div className={formSectionClass}>
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
            <input value={form.name} onChange={(e) => handleNameChange(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Slug</label>
            <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className={inputClass} />
            <p className="text-xs text-gray-500 mt-1">Auto-generated from name; you can edit it.</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
            <select value={form.categoryId} onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))} required className={selectClass}>
              <option value="">Select category...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Price (PKR) *</label>
            <input type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} required className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Short Description</label>
            <input value={form.shortDescription} onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={4} className={textareaClass} />
          </div>
          <KeywordsField value={form.keywordsInput} onChange={(v) => setForm((f) => ({ ...f, keywordsInput: v }))} />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Product Image</label>
            <CloudinaryUpload
              onUpload={addImage}
              onUploadingChange={setImageUploading}
              folder="dorney/products"
            />
            {form.image && (
              <div className="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <img src={form.image} alt="" className="h-20 w-20 rounded-lg object-cover" />
                <button type="button" onClick={() => setForm((f) => ({ ...f, image: "" }))} className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                  Remove
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Image Alt (accessibility)</label>
            <input
              value={form.imageAlt}
              onChange={(e) => setForm((f) => ({ ...f, imageAlt: e.target.value }))}
              className={inputClass}
              placeholder="Describe the image for screen readers"
            />
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700">Show as featured product</label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Meta Title</label>
            <input value={form.metaTitle} onChange={(e) => setForm((f) => ({ ...f, metaTitle: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Meta Description</label>
            <input value={form.metaDescription} onChange={(e) => setForm((f) => ({ ...f, metaDescription: e.target.value }))} className={inputClass} />
          </div>
          <button
            type="submit"
            disabled={saving || imageUploading}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors shadow-sm"
          >
            {imageUploading ? "Uploading image…" : saving ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
