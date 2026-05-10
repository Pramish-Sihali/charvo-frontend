"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";

import {
  clearSession,
  getStoredUserSnapshot,
  subscribeAuth,
} from "../lib/auth";

const getServerSnapshot = () => null;

export function SiteHeader() {
  const router = useRouter();
  const user = useSyncExternalStore(
    subscribeAuth,
    getStoredUserSnapshot,
    getServerSnapshot,
  );

  const onLogout = () => {
    clearSession();
    router.push("/");
  };

  return (
    <header className="border-b border-[color:var(--border)] bg-[color:var(--background)]/80 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <span
            aria-hidden
            className="inline-block h-7 w-7 rounded-full bg-[color:var(--accent)] ring-2 ring-[color:var(--accent-strong)]/30 transition-transform group-hover:scale-105"
          />
          <span className="text-lg font-semibold tracking-tight">
            CharcoalX
          </span>
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/products"
            className="px-3 py-2 rounded-md hover:bg-[color:var(--surface-2)]"
          >
            Filters
          </Link>
          {user ? (
            <>
              <Link
                href="/orders"
                className="px-3 py-2 rounded-md hover:bg-[color:var(--surface-2)]"
              >
                Orders
              </Link>
              <button
                onClick={onLogout}
                className="px-3 py-2 rounded-md text-[color:var(--muted)] hover:text-[color:var(--foreground)] hover:bg-[color:var(--surface-2)]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-2 rounded-md hover:bg-[color:var(--surface-2)]"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="px-3 py-2 rounded-md bg-[color:var(--accent)] text-zinc-900 font-medium hover:bg-[color:var(--accent-strong)]"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
