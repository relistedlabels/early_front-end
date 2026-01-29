"use client";

import React from "react";
import { Paragraph1 } from "@/common/ui/Text";
import BackHeader from "@/common/ui/BackHeader";
import { useCreateProduct } from "@/lib/queries/product/useCreateProduct";
import { useProductDraftStore } from "@/store/useProductDraftStore";

interface UploadItemHeaderProps {
  title?: string;
  subtitle?: string;
}

const UploadItemHeader: React.FC<UploadItemHeaderProps> = ({
  title = "Add New Item",
  subtitle = "List a new fashion item for rent",
}) => {
  const { data } = useProductDraftStore();
  const createProduct = useCreateProduct();

  const handleSubmit = () => {
    if (createProduct.isPending) return;
    createProduct.mutate(data);
  };

  const isCreating = createProduct.isPending;

  return (
    <div className="mb-4 flex w-full flex-col gap-4 bg-transparent sm:flex-row sm:items-center sm:justify-between">
      <BackHeader title={title} subtitle={subtitle} />

      <div className="flex items-center space-x-3">
        <button
          onClick={handleSubmit}
          disabled={isCreating}
          className={`w-full rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all active:scale-95 sm:w-fit ${
            isCreating
              ? "cursor-not-allowed bg-gray-400"
              : "bg-[#33332D] hover:bg-black"
          }`}
        >
          <Paragraph1>{isCreating ? "Creating…" : "Post Item"}</Paragraph1>
        </button>
      </div>
    </div>
  );
};

export default UploadItemHeader;
