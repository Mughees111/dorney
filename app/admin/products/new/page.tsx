"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
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
    fetch("/api/categories", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setCategories(Array.isArray(d) ? d : []));
  }, []);

  const handleNameChange = (name: string) => {
    const newSlug = slugFromName(name);
    setForm((f) => ({
      ...f,
      name,
      slug: newSlug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const price = parseFloat(form.price);
      if (isNaN(price) || price <= 0) {
        setError("Price must be a positive number (PKR)");
        return;
      }
      const keywords = parseKeywordsInput(form.keywordsInput);
      const res = await fetch("/api/products", {
        method: "POST",
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
      setError(e instanceof Error ? e.message : "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const addImage = (url: string) => {
    setForm((f) => ({
      ...f,
      image: url,
    }));
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Add Product</h1>
      <p className="text-gray-500 mb-8">
        Add a new product. Fill in the details below.
      </p>
      <form onSubmit={handleSubmit} className={formCardClass}>
        <div className={formSectionClass}>
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Name *
            </label>
            <input
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              placeholder="e.g. Chocolate Cup Cake"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Slug
            </label>
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Category *
            </label>
            <select
              value={form.categoryId}
              onChange={(e) =>
                setForm((f) => ({ ...f, categoryId: e.target.value }))
              }
              required
              className={selectClass}
            >
              <option value="">Select category...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Price (PKR) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              required
              placeholder="e.g. 50"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Short Description
            </label>
            <input
              value={form.shortDescription}
              onChange={(e) =>
                setForm((f) => ({ ...f, shortDescription: e.target.value }))
              }
              placeholder="Brief one-line description"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              rows={4}
              placeholder="Full product description"
              className={textareaClass}
            />
          </div>
          <KeywordsField
            value={form.keywordsInput}
            onChange={(v) => setForm((f) => ({ ...f, keywordsInput: v }))}
            placeholder="chocolate cupcake, buy cupcake, fmcg cakes"
          />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Product Image
            </label>
            <CloudinaryUpload
              onUpload={addImage}
              onUploadingChange={setImageUploading}
              folder="dorney/products"
            />
            {form.image && (
              <div className="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <img
                  src={form.image}
                  alt=""
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, image: "" }))}
                  className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Image Alt (accessibility)
            </label>
            <input
              value={form.imageAlt}
              onChange={(e) =>
                setForm((f) => ({ ...f, imageAlt: e.target.value }))
              }
              placeholder="Describe the image for screen readers"
              className={inputClass}
            />
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) =>
                setForm((f) => ({ ...f, featured: e.target.checked }))
              }
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700">
              Show as featured product on homepage
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Meta Title
            </label>
            <input
              value={form.metaTitle}
              onChange={(e) =>
                setForm((f) => ({ ...f, metaTitle: e.target.value }))
              }
              placeholder="Optional - for search engines"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Meta Description
            </label>
            <input
              value={form.metaDescription}
              onChange={(e) =>
                setForm((f) => ({ ...f, metaDescription: e.target.value }))
              }
              placeholder="Optional - for search engine snippets"
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            disabled={loading || imageUploading}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors shadow-sm"
          >
            {imageUploading ? "Uploading image…" : loading ? "Creating…" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
