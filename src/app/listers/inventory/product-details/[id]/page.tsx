"use client";

import { useParams, useRouter } from "next/navigation";
import Breadcrumbs from "@/common/ui/BreadcrumbItem";
import DashboardLayout from "../../../components/DashboardLayout";
import ProductMediaGallery from "@/app/listers/components/ProductMediaGallery";
import InventoryItemDetailsHeader from "@/app/listers/components/InventoryItemDetailsHeader";
import ProductInfoTabs from "@/app/listers/components/ProductInfoTabs";
import RentalsHistory from "@/app/listers/components/RentalsHistory";
import ManageItemHeader from "@/app/listers/components/ManageItemHeader";
import { useProduct } from "@/lib/queries/product/useProduct";
import FullPageLoader from "@/common/ui/FullPageLoader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/http";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const productId = params.id as string;
  const { data: product, isLoading } = useProduct(productId);

  const toggleStatusMutation = useMutation({
    mutationFn: (isActive: boolean) =>
      apiFetch(`/product/${productId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ isActive }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({ queryKey: ["user-products"] });
    },
  });

  const path = [
    { label: "Dashboard", href: "/listers/dashboard" },
    { label: "Inventory", href: "/listers/inventory" },
    { label: product?.name || "Product Details", href: null },
  ];

  if (isLoading) {
    return (
      <DashboardLayout>
        <FullPageLoader />
      </DashboardLayout>
    );
  }

  const media = product?.attachments?.uploads?.map((upload: any) => ({
    type: upload.type?.startsWith("video") ? "video" : "image",
    src: upload.url,
  })) || [];

  const handleEdit = () => {
    router.push(`/listers/inventory/edit-item/${productId}`);
  };

  const handleToggleStatus = () => {
    const newStatus = product?.isActive === false ? true : false;
    toggleStatusMutation.mutate(newStatus);
  };

  return (
    <DashboardLayout>
      <div className="mb-4 px-4 sm:px-0">
        <Breadcrumbs items={path} />
      </div>
      <div>
        <ManageItemHeader
          title={product?.name}
          subtitle={product?.subText}
          onEdit={handleEdit}
          onDisable={handleToggleStatus}
          isDisabled={product?.isActive === false}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <ProductMediaGallery media={media} />
        </div>
        <div className="space-y-4">
          <InventoryItemDetailsHeader
            name={product?.name}
            description={product?.description}
            dailyPrice={`₦${(product?.dailyPrice || 0).toLocaleString()}`}
            itemValue={`₦${(product?.originalValue || 0).toLocaleString()}`}
            size={product?.size}
            color={product?.color}
            condition={product?.condition}
            status={product?.isActive !== false ? "Active" : "Disabled"}
          />
          <ProductInfoTabs
            composition={product?.composition}
            measurement={product?.measurement}
            careInstruction={product?.careInstruction}
            stylingTip={product?.stylingTip}
            warning={product?.warning}
          />
        </div>
      </div>
      <div>
        <RentalsHistory productId={productId} />
      </div>
    </DashboardLayout>
  );
}
