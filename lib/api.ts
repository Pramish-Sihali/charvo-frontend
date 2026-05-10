import { getToken } from "./auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type UserPublic = {
  id: string;
  email: string;
  full_name: string | null;
};

export type AuthResponse = {
  access_token: string;
  token_type: "bearer";
  user: UserPublic;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price_cents: number;
  stock: number;
  image_url: string | null;
};

export type Order = {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  total_cents: number;
  status: string;
  created_at: string;
  product: Product;
};

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  path: string,
  init: RequestInit & { auth?: boolean } = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  if (init.auth) {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_URL}${path}`, { ...init, headers });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const detail =
      (data && (data.detail ?? data.message)) ||
      `Request failed (${res.status})`;
    const message =
      typeof detail === "string" ? detail : JSON.stringify(detail);
    throw new ApiError(message, res.status);
  }
  return data as T;
}

export const api = {
  register: (body: { email: string; password: string; full_name: string }) =>
    request<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  login: (body: { email: string; password: string }) =>
    request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  getProducts: () => request<Product[]>("/api/products"),

  createOrder: (body: { product_id: string; quantity: number }) =>
    request<Order>("/api/orders", {
      method: "POST",
      body: JSON.stringify(body),
      auth: true,
    }),

  getMyOrders: () => request<Order[]>("/api/orders/me", { auth: true }),
};

export { ApiError };
