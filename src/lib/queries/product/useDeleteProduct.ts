import { useMutation } from "@tanstack/react-query";
import { productApi } from "@/lib/api/product";

export function useDeleteProduct() {
  return useMutation({
    mutationFn: (id: string) => productApi.remove(id),
  });
}
