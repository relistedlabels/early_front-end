import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi, ProductPayload } from "@/lib/api/product";
import { useRouter } from "next/navigation";
import { useProductDraftStore } from "@/store/useProductDraftStore";

export function useCreateProduct() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { reset } = useProductDraftStore();

  return useMutation({
    mutationFn: (data: ProductPayload) => productApi.create(data),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["user-products"] });
      router.push("/listers/inventory");
    },
    onError: (error: Error) => {
      console.error("Product creation error:", error);
      alert(error.message || "Failed to post item. Please try again.");
    },
  });
}
