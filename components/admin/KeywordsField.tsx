"use client";

import { Info } from "lucide-react";
import { inputClass, labelClass } from "./AdminFormStyles";

interface KeywordsFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const KEYWORDS_HELP =
  "Keywords help search engines find your product on Google. Enter words customers might search for, separated by commas. E.g. cake, bakery pakistan, wholesale cakes";

export function KeywordsField({
  value,
  onChange,
  placeholder = "e.g. cake, bakery, pakistan",
}: KeywordsFieldProps) {
  return (
    <div>
      <label className={labelClass}>
        <span className="flex items-center gap-2">
          SEO Keywords
          <span
            className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 text-gray-500 cursor-help text-xs"
            title={KEYWORDS_HELP}
          >
            <Info className="w-3 h-3" />
          </span>
        </span>
      </label>
      <p className="text-xs text-gray-500 mb-1.5">
        {KEYWORDS_HELP}
      </p>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
      <p className="text-xs text-gray-400 mt-1">
        Separate with commas. We&apos;ll store them for SEO automatically.
      </p>
    </div>
  );
}
