
import { useUserStore } from "@/store/useUserStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = useUserStore.getState().token;

  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let errorMessage = "Request failed";
    try {
      const error = await res.json();
      errorMessage = error?.message ?? errorMessage;
    } catch {}

    // 🔐 Auto logout on 401 (optional but recommended)
    if (res.status === 401) {
      useUserStore.getState().clearUser();
    }

    throw new Error(errorMessage);
  }

  return res.json();
}
