"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Asterisk } from "../../components/editorial/Asterisk";
import { Display } from "../../components/editorial/Display";
import { Eyebrow } from "../../components/editorial/Eyebrow";
import { api } from "../../lib/api";
import { saveSession } from "../../lib/auth";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});

type Values = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: Values) => {
    setSubmitting(true);
    try {
      const { access_token, user } = await api.login(values);
      saveSession(access_token, user);
      toast.success("Signed in");
      router.push("/products");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
      <header className="pt-20 md:pt-32 pb-12">
        <div className="grid gap-12 md:grid-cols-12 items-end">
          <div className="md:col-span-9">
            <Eyebrow>CX/04 — Sign in</Eyebrow>
            <h1
              className="mt-8 leading-[0.92] tracking-tight"
              style={{ fontSize: "var(--text-5xl)" }}
            >
              Welcome <Display>back.</Display>
            </h1>
          </div>
        </div>
      </header>

      <Asterisk />

      <section className="pb-32">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-md space-y-10 border-t border-[color:var(--border)] pt-12"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-[11px] uppercase tracking-[0.22em] text-[color:var(--subtle)]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              className="mt-3 w-full bg-transparent border-b border-[color:var(--border-strong)] py-3 text-base focus:border-[color:var(--accent)] focus:outline-none transition-colors"
            />
            {errors.email ? (
              <p className="mt-2 text-xs text-[color:var(--danger)]">{errors.email.message}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[11px] uppercase tracking-[0.22em] text-[color:var(--subtle)]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
              className="mt-3 w-full bg-transparent border-b border-[color:var(--border-strong)] py-3 text-base focus:border-[color:var(--accent)] focus:outline-none transition-colors"
            />
            {errors.password ? (
              <p className="mt-2 text-xs text-[color:var(--danger)]">{errors.password.message}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-between border border-[color:var(--foreground)] px-6 py-4 text-sm uppercase tracking-[0.2em] hover:bg-[color:var(--foreground)] hover:text-[color:var(--background)] transition-colors disabled:opacity-50"
          >
            <span>{submitting ? "Signing in…" : "Sign in"}</span>
            <span aria-hidden>→</span>
          </button>

          <p className="text-sm text-[color:var(--muted)]">
            Need an account?{" "}
            <Link
              href="/register"
              className="border-b border-[color:var(--foreground)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]"
            >
              Register
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
