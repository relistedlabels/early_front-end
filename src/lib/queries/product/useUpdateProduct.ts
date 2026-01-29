import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi, ProductPayload } from "@/lib/api/product";
import { useRouter } from "next/navigation";

export function useUpdateProduct(productId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<ProductPayload>) => productApi.update(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({ queryKey: ["user-products"] });
      router.push(`/listers/inventory/product-details/${productId}`);
    },
    onError: (error: Error) => {
      console.error("Product update error:", error);
      alert(error.message || "Failed to update item. Please try again.");
    },
  });
}
