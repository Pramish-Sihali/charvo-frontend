import type { UserPublic } from "./api";

const TOKEN_KEY = "charcoalx_token";
const USER_KEY = "charcoalx_user";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): UserPublic | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserPublic;
  } catch {
    return null;
  }
}

let cachedRaw: string | null = null;
let cachedUser: UserPublic | null = null;

export function getStoredUserSnapshot(): UserPublic | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (raw === cachedRaw) return cachedUser;
  cachedRaw = raw;
  cachedUser = raw ? (safeParse(raw)) : null;
  return cachedUser;
}

function safeParse(raw: string): UserPublic | null {
  try {
    return JSON.parse(raw) as UserPublic;
  } catch {
    return null;
  }
}

export function subscribeAuth(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("charcoalx-auth", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("charcoalx-auth", callback);
    window.removeEventListener("storage", callback);
  };
}

export function saveSession(token: string, user: UserPublic) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("charcoalx-auth"));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("charcoalx-auth"));
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
