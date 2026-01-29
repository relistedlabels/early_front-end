"use client";

import React from "react";
import { Paragraph3, Paragraph1 } from "@/common/ui/Text";
import { useProductDraftStore } from "@/store/useProductDraftStore";

export const ItemDescription: React.FC = () => {
  const { data, setField } = useProductDraftStore();

  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <Paragraph3 className="text-sm font-semibold text-black">
        Description
      </Paragraph3>
      <Paragraph1 className="mb-4 text-xs text-gray-500">
        Upload atleast 5 high quality images and videos of your item
      </Paragraph1>

      <div className="space-y-4">
        <div>
          <Paragraph1 className="mb-1 text-xs font-medium text-gray-700">
            Description
          </Paragraph1>
          <textarea
            rows={3}
            value={data.description}
            onChange={(e) => setField("description", e.target.value)}
            placeholder="Describe your item in detail..."
            className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-black"
          />
        </div>

        <div>
          <Paragraph1 className="mb-1 text-xs font-medium text-gray-700">
            Styling Tips (Optional)
          </Paragraph1>
          <textarea
            rows={2}
            value={data.stylingTip}
            onChange={(e) => setField("stylingTip", e.target.value)}
            placeholder="Share how to style this piece"
            className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-black"
          />
        </div>

        <div>
          <Paragraph1 className="mb-1 text-xs font-medium text-gray-700">
            Care Instructions
          </Paragraph1>
          <textarea
            rows={2}
            value={data.careInstruction}
            onChange={(e) => setField("careInstruction", e.target.value)}
            placeholder="How should a dresser care for this item"
            className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-black"
          />
        </div>
      </div>
    </div>
  );
};
