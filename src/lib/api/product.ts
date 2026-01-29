// lib/api/product.ts
import { apiFetch } from "./http";
type Attachment = {
  id: string;
  url: string;
  name: string;
  progress:number
  type?:string
  slotId?:string
};


export type UserProduct = {
  id: string;
  name: string;
  size: string;
  color: string;
  pricePerDay: number;
  originalValue: number;
  createdAt: string;
  status: "ACTIVE" | "DISABLED";
  isRented: boolean;
  attachments: {
    url: string;
  }[];
};


export type ProductPayload = {
  name: string;
  subText: string;
  description: string;
  condition: string;
  composition: string;
  measurement: string;
  originalValue: number;
  color: string[];
  warning: string;
  size: string;
  careInstruction: string;
  careSteps: string[];
  stylingTip: string;
  attachments: Attachment[];
  categoryId: string;
  brandId: string;
};

export const productApi = {
  create: (data: ProductPayload) => {
    const payload = {
      ...data,
      color: Array.isArray(data.color) ? data.color.join(", ") : data.color,
      careSteps: Array.isArray(data.careSteps) ? data.careSteps.join(", ") : data.careSteps,
      attachments: data.attachments.map((a) => a.id),
    };
    return apiFetch<{ id: string }>("/product", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getById: (id: string) =>
    apiFetch<ProductPayload>(`/product/${id}`, {
      method: "GET",
    }),

  update: (id: string, data: Partial<ProductPayload>) => {
    const payload = {
      ...data,
      color: Array.isArray(data.color) ? data.color.join(", ") : data.color,
      careSteps: Array.isArray(data.careSteps) ? data.careSteps.join(", ") : data.careSteps,
      attachments: data.attachments?.map((a) => a.id),
    };
    return apiFetch<void>(`/product/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  remove: (id: string) =>
    apiFetch<void>(`/product/${id}`, {
      method: "DELETE",
    }),

  getUserProducts: () =>
    apiFetch<UserProduct[]>("/product/user-products", {
      method: "GET",
    }),
};


