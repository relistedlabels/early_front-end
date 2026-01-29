// lib/queries/product/useUserProducts.ts
import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/lib/api/product";

export const useUserProducts = () =>
  useQuery({
    queryKey: ["user-products"],
    queryFn: productApi.getUserProducts,
    staleTime: 5 * 60 * 1000,
  });
