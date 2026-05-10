"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { api } from "../../lib/api";
import { saveSession } from "../../lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await api.register({ email, password, full_name: fullName });
      saveSession(res.access_token, res.user);
      router.push("/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight mb-2">Create your account</h1>
      <p className="text-sm text-[color:var(--muted)] mb-8">
        One account, your order history. No marketing emails.
      </p>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5" htmlFor="full_name">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Full name</span>
          <Input
            id="full_name"
            name="full_name"
            autoComplete="name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1.5" htmlFor="email">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Email</span>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1.5" htmlFor="password">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Password</span>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={6}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && (
          <p className="text-sm text-[color:var(--danger)]">{error}</p>
        )}
        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:bg-[color:var(--accent-strong)]"
        >
          {submitting ? "Creating account…" : "Create account"}
        </Button>
      </form>
      <p className="mt-6 text-sm text-[color:var(--muted)]">
        Already have an account?{" "}
        <Link href="/login" className="text-[color:var(--accent)] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
