"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload";
import {
  inputClass,
  textareaClass,
  selectClass,
  formCardClass,
  formSectionClass,
} from "@/components/admin/AdminFormStyles";

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
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Add Hero Slide</h1>
      <p className="text-gray-500 mb-8">
        Add a new hero slide for the homepage.
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
              Title *
            </label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
              placeholder="e.g. Welcome to Dornay"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Subtitle
            </label>
            <input
              value={form.subtitle}
              onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
              placeholder="Optional subtitle text"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              placeholder="Optional description text"
              className={textareaClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Display Order
            </label>
            <input
              type="number"
              value={form.displayOrder}
              onChange={(e) => setForm((f) => ({ ...f, displayOrder: e.target.value }))}
              placeholder="0"
              className={inputClass}
            />
            <p className="text-xs text-gray-500 mt-1">
              Lower numbers appear first. Leave as 0 for auto-ordering.
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Image
            </label>
            <CloudinaryUpload
              onUpload={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
              folder="dorney/hero"
            />
            {form.imageUrl && (
              <div className="mt-3">
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="h-32 w-auto rounded-lg object-cover border border-gray-200"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Image Alt Text
            </label>
            <input
              value={form.imageAlt}
              onChange={(e) => setForm((f) => ({ ...f, imageAlt: e.target.value }))}
              placeholder="Accessibility text for the image"
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors shadow-sm"
          >
            {loading ? "Creating…" : "Create Slide"}
          </button>
        </div>
      </form>
    </div>
  );
}
