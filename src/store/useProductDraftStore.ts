// lib/stores/productDraftStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
export type Attachment = {
  id: string;
  url: string;
  name: string;
  progress:number
  type?:string
  slotId?:string
};



// store/productDraftStore.ts

export type ProductDraft = {
  name: string;
  subText: string;
  description: string;
  condition: string;
  composition: string;
  measurement: string;
  originalValue: number;

  color: string[];        // ✅ array
  warning: string;
  size: string;           // ✅ required

  careInstruction: string;
  careSteps: string[];    // ✅ array
  stylingTip: string;

  attachments: Attachment[];
  categoryId: string;
  brandId: string;
};


type ProductDraftStore = {
  data: ProductDraft;
  setField: <K extends keyof ProductDraft>(
    key: K,
    value: ProductDraft[K],
  ) => void;
  mergeData: (partial: Partial<ProductDraft>) => void;
  reset: () => void;
};

const initialState: ProductDraft = {
  name: "",
  subText: "",
  description: "",
  condition: "",
  composition: "",
  measurement: "",
  originalValue: 0,

  color: [], // ✅
  warning: "",
  size: "", // ✅

  careInstruction: "",
  careSteps: [], // ✅
  stylingTip: "",

  attachments: [],
  categoryId: "",
  brandId: "",
};


export const useProductDraftStore = create<ProductDraftStore>()(
  persist(
    (set) => ({
      data: initialState,

      setField: (key, value) =>
        set((state) => ({
          data: { ...state.data, [key]: value },
        })),

      mergeData: (partial) =>
        set((state) => ({
          data: { ...state.data, ...partial },
        })),

      reset: () => set({ data: initialState }),
    }),
    {
      name: "product-draft-store", // localStorage key
    },
  ),
);
