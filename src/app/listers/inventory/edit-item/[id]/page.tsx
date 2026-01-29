"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import Breadcrumbs from "@/common/ui/BreadcrumbItem";
import DashboardLayout from "../../../components/DashboardLayout";
import { ItemImageUploader } from "@/app/listers/components/ItemImageUploader";
import { BasicInformationForm } from "@/app/listers/components/BasicInformationForm";
import { TagSelector } from "@/app/listers/components/TagSelector";
import { ItemDescription } from "@/app/listers/components/ItemDescription";
import { useProduct } from "@/lib/queries/product/useProduct";
import { useProductDraftStore, Attachment } from "@/store/useProductDraftStore";
import { useUpdateProduct } from "@/lib/queries/product/useUpdateProduct";
import FullPageLoader from "@/common/ui/FullPageLoader";
import BackHeader from "@/common/ui/BackHeader";
import { Paragraph1 } from "@/common/ui/Text";

export default function EditItemPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const { data: product, isLoading, error } = useProduct(productId);
  const { data, setField, mergeData } = useProductDraftStore();
  const updateProduct = useUpdateProduct(productId);

  useEffect(() => {
    if (product) {
      const attachments: Attachment[] = product.attachments?.uploads?.map((upload: any, index: number) => ({
        id: upload.id,
        url: upload.url,
        name: upload.name || `Image ${index + 1}`,
        progress: 100,
        type: upload.type?.startsWith("video") ? "video" : "image",
        slotId: index === 0 ? "main" : index === 4 ? "video" : `photo${index}`,
      })) || [];

      mergeData({
        name: product.name || "",
        subText: product.subText || "",
        description: product.description || "",
        condition: product.condition || "",
        composition: product.composition || "",
        measurement: product.measurement || "",
        originalValue: product.originalValue || 0,
        color: product.color ? product.color.split(", ") : [],
        warning: product.warning || "",
        size: product.size || "",
        careInstruction: product.careInstruction || "",
        careSteps: product.careSteps ? product.careSteps.split(", ") : [],
        stylingTip: product.stylingTip || "",
        attachments,
        categoryId: product.categoryId || "",
        brandId: product.brandId || "",
      });
    }
  }, [product, mergeData]);

  const path = [
    { label: "Dashboard", href: "/listers/dashboard" },
    { label: "Inventory", href: "/listers/inventory" },
    { label: product?.name || "Edit Item", href: null },
  ];

  const handleSubmit = () => {
    if (updateProduct.isPending) return;
    updateProduct.mutate(data);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <FullPageLoader />
      </DashboardLayout>
    );
  }

  if (error || !product) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-red-500 mb-4">Failed to load product. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black"
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-4 px-4 sm:px-0">
        <Breadcrumbs items={path} />
      </div>
      <div className="mb-4 flex w-full flex-col gap-4 bg-transparent sm:flex-row sm:items-center sm:justify-between">
        <BackHeader title="Edit Item" subtitle="Update your fashion item details" />
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSubmit}
            disabled={updateProduct.isPending}
            className={`w-full rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all active:scale-95 sm:w-fit ${
              updateProduct.isPending
                ? "cursor-not-allowed bg-gray-400"
                : "bg-[#33332D] hover:bg-black"
            }`}
          >
            <Paragraph1>{updateProduct.isPending ? "Saving…" : "Save Changes"}</Paragraph1>
          </button>
        </div>
      </div>
      <div>
        <ItemImageUploader />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <BasicInformationForm />
        <div className="space-y-4">
          <TagSelector />
          <ItemDescription />
        </div>
      </div>
    </DashboardLayout>
  );
}
