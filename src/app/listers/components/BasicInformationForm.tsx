"use client";

import React, { useMemo } from "react";
import { Paragraph3, Paragraph1 } from "@/common/ui/Text";
import { BrandSelector } from "./BrandSelector";
import { CategorySelector } from "./CategorySelector";
import { SizeSelector } from "./SizeSelector";
import { ColorSelector } from "./ColorSelector";
import { ConditionSelector } from "./ConditionSelector";
import { useProductDraftStore } from "@/store/useProductDraftStore";
import { PricingFields } from "./PricingFields";

export const BasicInformationForm: React.FC = () => {
  const { data, setField } = useProductDraftStore();

  const dailyRentalPrice = useMemo(
    () => Math.round((data.originalValue || 0) * 0.1),
    [data.originalValue],
  );

  return (
    <div className="w-full rounded-xl border border-gray-200 p-4">
      <div className="mb-4">
        <Paragraph3 className="text-sm font-semibold text-black">
          Basic Information
        </Paragraph3>
        <Paragraph1 className="text-xs text-gray-500">
          Fill in the details about your item
        </Paragraph1>
      </div>

      <div className="space-y-4">
        <div>
          <Paragraph1 className="mb-1 text-xs font-medium text-gray-700">
            Item Name
          </Paragraph1>
          <input
            type="text"
            placeholder="eg. Fendi Arco Boots"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-black"
            value={data.name}
            onChange={(e) => setField("name", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <BrandSelector />
          <CategorySelector />
        </div>

        <PricingFields />
        
        <div className="grid grid-cols-2 gap-4">
          <SizeSelector />
          <ColorSelector />
        </div>

        <ConditionSelector />
      </div>
    </div>
  );
};
