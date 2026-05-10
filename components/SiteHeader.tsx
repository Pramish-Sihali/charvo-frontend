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
    <header className="border-b border-[color:var(--border)]">
      <div className="mx-auto flex max-w-[1400px] items-baseline justify-between px-6 sm:px-10 py-6">
        <Link href="/" className="group inline-flex items-baseline gap-1">
          <span className="text-base font-semibold tracking-tight">
            Charcoal
          </span>
          <span
            className="text-base font-normal italic text-[color:var(--accent)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            X
          </span>
          <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-[color:var(--subtle)]">
            ®
          </span>
        </Link>
        <nav className="flex items-center gap-8 text-[11px] uppercase tracking-[0.18em]">
          <Link href="/products" className="hover:text-[color:var(--accent)] transition-colors">
            Filters
          </Link>
          <Link href="/science" className="hover:text-[color:var(--accent)] transition-colors">
            Science
          </Link>
          {user ? (
            <>
              <Link href="/orders" className="hover:text-[color:var(--accent)] transition-colors">
                Orders
              </Link>
              <button onClick={onLogout} className="hover:text-[color:var(--accent)] transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-[color:var(--accent)] transition-colors">
                Sign in
              </Link>
              <Link
                href="/register"
                className="border-b border-[color:var(--foreground)] pb-0.5 hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
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
