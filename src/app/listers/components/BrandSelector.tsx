"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Plus, Check } from "lucide-react";
import { Paragraph1 } from "@/common/ui/Text";
import { useProductDraftStore } from "@/store/useProductDraftStore";
import { brandApi } from "@/lib/api/brand";

type Brand = {
  id: string;
  name: string;
};

export const BrandSelector: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const { data, setField } = useProductDraftStore();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await brandApi.getAllBrand();
        setBrands(response as Brand[]);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  const filtered = brands.filter((brand) =>
    brand.name.toLowerCase().includes(query.toLowerCase()),
  );

  const selectedBrand = brands.find((b) => b.id === data.brandId);

  return (
    <div className="relative w-full">
      <Paragraph1 className="mb-1 text-xs font-medium text-gray-700">
        Brand / Designer
      </Paragraph1>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-black"
      >
        <span className={selectedBrand ? "text-black" : "text-gray-400"}>
          {loading ? "Loading..." : selectedBrand?.name ?? "Select brand"}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-sm">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brand..."
            className="w-full border-b border-gray-100 px-3 py-2 text-sm outline-none"
          />

          <div className="max-h-48 overflow-y-auto">
            {filtered.map((brand) => (
              <button
                key={brand.id}
                type="button"
                onClick={() => {
                  setField("brandId", brand.id);
                  setOpen(false);
                  setQuery("");
                }}
                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-50"
              >
                {brand.name}
                {data.brandId === brand.id && <Check className="h-4 w-4 text-black" />}
              </button>
            ))}

            {filtered.length === 0 && !loading && (
              <div className="px-3 py-2 text-sm text-gray-500">
                No brands found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
