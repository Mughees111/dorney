"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";

interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  displayOrder: number;
}

export default function AdminHeroPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/hero-slides", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setSlides(Array.isArray(d) ? d : []))
      .catch(() => setSlides([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This action cannot be undone.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/hero-slides/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setSlides((prev) => prev.filter((s) => s.id !== id));
      } else {
        alert("Failed to delete slide");
      }
    } catch {
      alert("Failed to delete slide");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Hero Slides</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage hero section slides on the homepage
          </p>
        </div>
        <Link
          href="/admin/hero/new"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Add Slide
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subtitle</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {slides.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{s.displayOrder}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{s.subtitle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/hero/${s.id}`} className="text-primary hover:underline">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(s.id, s.title)}
                      disabled={deleting === s.id}
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
        {slides.length === 0 && (
          <p className="p-8 text-center text-gray-500">
            No hero slides. Add one to show on the homepage.
          </p>
        )}
      </div>
    </div>
  );
}
