import { apiFetch } from "./http";

export type RentalRecord = {
  id: string;
  productId: string;
  curatorId: string;
  userId: string;
  days: number;
  totalAmount: number;
  startDate: string;
  endDate: string;
  returnedAt: string | null;
  isReturned: boolean;
  isOverdue: boolean;
  createdAt: string;
  product: {
    id: string;
    name: string;
    pricePerDay: number;
  };
  user: {
    id: string;
    email: string;
    profile?: {
      firstName: string;
      lastName: string;
    };
  };
  order?: {
    id: string;
    status: string;
  };
};

export const rentalApi = {
  getMyRentals: () =>
    apiFetch<RentalRecord[]>("/rental/my-rentals", {
      method: "GET",
    }),

  getByProduct: (productId: string) =>
    apiFetch<RentalRecord[]>(`/rental/product/${productId}`, {
      method: "GET",
    }),

  getById: (id: string) =>
    apiFetch<RentalRecord>(`/rental/${id}`, {
      method: "GET",
    }),
};
