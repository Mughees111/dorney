"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  inputClass,
  textareaClass,
  formCardClass,
  formSectionClass,
} from "@/components/admin/AdminFormStyles";

const colorPresets = [
  { name: "Orange", bg: "#FFF3E0", accent: "#FF6B00" },
  { name: "Pink", bg: "#FCE4EC", accent: "#E91E63" },
  { name: "Green", bg: "#E8F5E9", accent: "#2E7D32" },
  { name: "Purple", bg: "#EDE7F6", accent: "#6A1B9A" },
  { name: "Blue", bg: "#E3F2FD", accent: "#1976D2" },
  { name: "Red", bg: "#FFEBEE", accent: "#D32F2F" },
];

export default function NewFlashDealPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    subtitle: "",
    originalPrice: "",
    salePrice: "",
    emoji: "",
    tag: "",
    bgColor: "#FFF3E0",
    accentColor: "#FF6B00",
    displayOrder: "0",
    isActive: true,
  });

  const calculatedDiscount =
    form.originalPrice && form.salePrice
      ? Math.round(
          ((parseFloat(form.originalPrice) - parseFloat(form.salePrice)) /
            parseFloat(form.originalPrice)) *
            100
        )
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const originalPrice = parseFloat(form.originalPrice);
      const salePrice = parseFloat(form.salePrice);
      if (isNaN(originalPrice) || originalPrice <= 0) {
        setError("Original price must be a positive number");
        return;
      }
      if (isNaN(salePrice) || salePrice <= 0) {
        setError("Sale price must be a positive number");
        return;
      }
      if (salePrice >= originalPrice) {
        setError("Sale price must be less than original price");
        return;
      }

      const res = await fetch("/api/flash-deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: form.name,
          subtitle: form.subtitle || undefined,
          originalPrice,
          salePrice,
          emoji: form.emoji || undefined,
          tag: form.tag || undefined,
          bgColor: form.bgColor,
          accentColor: form.accentColor,
          displayOrder: parseInt(form.displayOrder) || 0,
          isActive: form.isActive,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      router.push("/admin/flash-deals");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create deal");
    } finally {
      setLoading(false);
    }
  };

  const applyColorPreset = (preset: (typeof colorPresets)[0]) => {
    setForm((f) => ({ ...f, bgColor: preset.bg, accentColor: preset.accent }));
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Add Flash Deal</h1>
      <p className="text-gray-500 mb-8">
        Create a new flash deal to display on the homepage.
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
              Deal Name *
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              placeholder="e.g. Cream Cupcakes"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Subtitle
            </label>
            <input
              value={form.subtitle}
              onChange={(e) =>
                setForm((f) => ({ ...f, subtitle: e.target.value }))
              }
              placeholder="e.g. Vanilla & Chocolate Mix"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Original Price (PKR) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.originalPrice}
                onChange={(e) =>
                  setForm((f) => ({ ...f, originalPrice: e.target.value }))
                }
                required
                placeholder="e.g. 250"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Sale Price (PKR) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.salePrice}
                onChange={(e) =>
                  setForm((f) => ({ ...f, salePrice: e.target.value }))
                }
                required
                placeholder="e.g. 175"
                className={inputClass}
              />
            </div>
          </div>

          {calculatedDiscount > 0 && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-green-800 font-medium">
                Discount: {calculatedDiscount}% off
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Emoji
              </label>
              <input
                value={form.emoji}
                onChange={(e) =>
                  setForm((f) => ({ ...f, emoji: e.target.value }))
                }
                placeholder="e.g. 🧁"
                className={inputClass}
              />
              <p className="text-xs text-gray-500 mt-1">
                Single emoji to display on the card
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Tag
              </label>
              <input
                value={form.tag}
                onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
                placeholder="e.g. Best Seller"
                className={inputClass}
              />
              <p className="text-xs text-gray-500 mt-1">
                Label shown on the card (e.g. Hot Deal, Bulk Deal)
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Color Theme
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => applyColorPreset(preset)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: preset.bg }}
                >
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: preset.accent }}
                  />
                  <span className="text-sm font-medium">{preset.name}</span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.bgColor}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, bgColor: e.target.value }))
                    }
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <input
                    value={form.bgColor}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, bgColor: e.target.value }))
                    }
                    placeholder="#FFF3E0"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Accent Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.accentColor}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, accentColor: e.target.value }))
                    }
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <input
                    value={form.accentColor}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, accentColor: e.target.value }))
                    }
                    placeholder="#FF6B00"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="p-4 rounded-xl border-2"
            style={{
              backgroundColor: form.bgColor,
              borderColor: form.accentColor,
            }}
          >
            <p className="text-xs text-gray-600 mb-2">Preview:</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{form.emoji || "🎁"}</span>
              <div>
                <div className="font-bold" style={{ color: form.accentColor }}>
                  {form.name || "Deal Name"}
                </div>
                <div className="text-sm text-gray-600">
                  {form.subtitle || "Subtitle"}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Display Order
            </label>
            <input
              type="number"
              value={form.displayOrder}
              onChange={(e) =>
                setForm((f) => ({ ...f, displayOrder: e.target.value }))
              }
              placeholder="0"
              className={inputClass}
            />
            <p className="text-xs text-gray-500 mt-1">
              Lower numbers appear first
            </p>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <input
              type="checkbox"
              id="isActive"
              checked={form.isActive}
              onChange={(e) =>
                setForm((f) => ({ ...f, isActive: e.target.checked }))
              }
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label
              htmlFor="isActive"
              className="text-sm font-medium text-gray-700"
            >
              Active (show on homepage)
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors shadow-sm"
          >
            {loading ? "Creating…" : "Create Deal"}
          </button>
        </div>
      </form>
    </div>
  );
}
