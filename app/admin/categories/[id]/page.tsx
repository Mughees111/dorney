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
  formCardClass,
  formSectionClass,
  parseKeywordsInput,
  slugFromName,
} from "@/components/admin/AdminFormStyles";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
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

  useEffect(() => {
    fetch(`/api/categories/${id}`, { credentials: "include" })
      .then((r) => r.json())
      .then((cat) => {
        if (cat?.id) {
          const kw = Array.isArray(cat.keywords) ? cat.keywords : [];
          setForm({
            name: cat.name ?? "",
            slug: cat.slug ?? "",
            description: cat.description ?? "",
            imageUrl: cat.imageUrl ?? cat.image ?? "",
            imageAlt: cat.imageAlt ?? "",
            metaTitle: cat.metaTitle ?? "",
            metaDescription: cat.metaDescription ?? "",
            keywordsInput: kw.join(", "),
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleNameChange = (name: string) => {
    const newSlug = slugFromName(name);
    setForm((f) => ({ ...f, name, slug: f.slug || newSlug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const keywords = parseKeywordsInput(form.keywordsInput);
      const res = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: form.name,
          slug: form.slug || slugFromName(form.name),
          description: form.description || undefined,
          imageUrl: form.imageUrl || null,
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
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );

  return (
    <div className="max-w-3xl">
      <Link href="/admin/categories" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Categories
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Category</h1>
      <p className="text-gray-500 mb-8">Update category details.</p>
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} className={textareaClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Image</label>
            <CloudinaryUpload
              onUpload={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
              onUploadingChange={setImageUploading}
              folder="dorney/categories"
            />
            {form.imageUrl ? (
              <div className="mt-3 flex items-center gap-4">
                <img src={form.imageUrl} alt="Preview" className="h-28 w-28 rounded-lg object-cover border border-gray-200" />
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, imageUrl: "" }))}
                  className="text-sm text-red-600 hover:text-red-800 hover:underline"
                >
                  Clear image
                </button>
              </div>
            ) : (
              <p className="mt-2 text-sm text-gray-500">No image. Upload one above.</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Image Alt</label>
            <input value={form.imageAlt} onChange={(e) => setForm((f) => ({ ...f, imageAlt: e.target.value }))} className={inputClass} />
          </div>
          <KeywordsField value={form.keywordsInput} onChange={(v) => setForm((f) => ({ ...f, keywordsInput: v }))} />
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
