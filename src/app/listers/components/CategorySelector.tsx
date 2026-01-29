"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Paragraph1 } from "@/common/ui/Text";
import { useProductDraftStore } from "@/store/useProductDraftStore";
import { categoryApi } from "@/lib/api/category";

type Category = {
  id: string;
  name: string;
};

export const CategorySelector: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { data, setField } = useProductDraftStore();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getCategories();
        setCategories(response as Category[]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(query.toLowerCase()),
  );

  const selectedCategory = categories.find((c) => c.id === data.categoryId);

  return (
    <div className="relative w-full">
      <Paragraph1 className="mb-1 text-xs font-medium text-gray-700">
        Category
      </Paragraph1>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-black"
      >
        <span className={selectedCategory ? "text-black" : "text-gray-400"}>
          {loading ? "Loading..." : selectedCategory?.name ?? "Select category"}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-sm">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search category..."
            className="w-full border-b border-gray-100 px-3 py-2 text-sm outline-none"
          />

          <div className="max-h-48 overflow-y-auto">
            {filtered.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  setField("categoryId", category.id);
                  setOpen(false);
                  setQuery("");
                }}
                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-50"
              >
                {category.name}
                {data.categoryId === category.id && <Check className="h-4 w-4 text-black" />}
              </button>
            ))}

            {filtered.length === 0 && !loading && (
              <div className="px-3 py-2 text-sm text-gray-500">
                No categories found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
