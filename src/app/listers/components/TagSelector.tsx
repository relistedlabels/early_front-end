"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Paragraph1, Paragraph3 } from "@/common/ui/Text";
import { useProductDraftStore } from "@/store/useProductDraftStore";

const INITIAL_TAGS = [
  "Men",
  "Women",
  "Unisex",
  "Nightlife",
  "Summer",
  "Casual",
  "Luxury",
  "Formal",
  "Streetwear",
  "Vintage",
  "Party",
  "Workwear",
];

export const TagSelector: React.FC = () => {
  const [tags, setTags] = useState<string[]>(INITIAL_TAGS);
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const { setField } = useProductDraftStore();

  const filteredTags = useMemo(
    () => tags.filter((tag) => tag.toLowerCase().includes(query.toLowerCase())),
    [tags, query],
  );

  useEffect(() => {
    setField("subText", selected.join(", "));
  }, [selected, setField]);

  const toggleTag = (tag: string) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const canAdd = query.length > 0 && filteredTags.length === 0;

  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <Paragraph3 className="mb-1 text-xs font-bold text-black">
        Tags
      </Paragraph3>
      <Paragraph1 className="mb-3 text-xs text-gray-500">
        Select tags that are associated with this item
      </Paragraph1>

      {/* Search */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tags..."
        className="mb-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-black"
      />

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {filteredTags.map((tag) => {
          const active = selected.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition ${
                active
                  ? "border-black bg-black text-white"
                  : "border-gray-200 text-gray-700 hover:border-gray-400"
              }`}
            >
              <Paragraph1>{tag}</Paragraph1>
            </button>
          );
        })}

        {/* Add new tag */}
        {canAdd && (
          <button
            type="button"
            onClick={() => {
              setTags((prev) => [...prev, query]);
              setSelected((prev) => [...prev, query]);
              setQuery("");
            }}
            className="flex items-center gap-1 rounded-md border border-dashed border-gray-400 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-black"
          >
            <Plus className="h-3 w-3" />
            Add “{query}”
          </button>
        )}
      </div>
    </div>
  );
};
