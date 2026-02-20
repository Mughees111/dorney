/**
 * Shared form styles for admin panel
 */

export const inputClass =
  "mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-gray-200/50 focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none transition-all";

export const textareaClass =
  "mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-gray-200/50 focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none transition-all resize-y";

export const selectClass =
  "mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-gray-200/50 focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none transition-all";

export const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

export const formSectionClass = "space-y-6";

export const formCardClass =
  "bg-white rounded-xl shadow-md border border-gray-100 p-8 max-w-2xl";

/** Convert user-entered keywords (comma-separated) to JSON array. Never throws. */
export function parseKeywordsInput(input: string): string[] {
  if (!input || typeof input !== "string") return [];
  return input
    .split(/[,;|\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Generate URL-friendly slug from name */
export function slugFromName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
