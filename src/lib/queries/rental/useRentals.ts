import { useQuery } from "@tanstack/react-query";
import { rentalApi, RentalRecord } from "@/lib/api/rental";

export const useMyRentals = () => {
  return useQuery<RentalRecord[]>({
    queryKey: ["my-rentals"],
    queryFn: rentalApi.getMyRentals,
  });
};

export const useProductRentals = (productId: string) => {
  return useQuery<RentalRecord[]>({
    queryKey: ["product-rentals", productId],
    queryFn: () => rentalApi.getByProduct(productId),
    enabled: !!productId,
  });
};
