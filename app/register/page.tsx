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
  full_name: z.string().min(2, "Tell us your name"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});

type Values = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { full_name: "", email: "", password: "" },
  });

  const onSubmit = async (values: Values) => {
    setSubmitting(true);
    try {
      const { access_token, user } = await api.register(values);
      saveSession(access_token, user);
      toast.success("Account created");
      router.push("/products");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
      <header className="pt-20 md:pt-32 pb-12">
        <div className="grid gap-12 md:grid-cols-12 items-end">
          <div className="md:col-span-9">
            <Eyebrow>CX/05 — Register</Eyebrow>
            <h1
              className="mt-8 leading-[0.92] tracking-tight"
              style={{ fontSize: "var(--text-5xl)" }}
            >
              Make an <Display>account.</Display>
            </h1>
            <p className="mt-6 max-w-md text-base text-[color:var(--muted)] leading-relaxed">
              Track orders and reorder fast.
            </p>
          </div>
        </div>
      </header>

      <Asterisk />

      <section className="pb-32">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-md space-y-10 border-t border-[color:var(--border)] pt-12"
        >
          {(["full_name", "email", "password"] as const).map((name) => {
            const labels: Record<string, string> = {
              full_name: "Name",
              email: "Email",
              password: "Password",
            };
            const types: Record<string, string> = {
              full_name: "text",
              email: "email",
              password: "password",
            };
            const autocompletes: Record<string, string> = {
              full_name: "name",
              email: "email",
              password: "new-password",
            };
            return (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block text-[11px] uppercase tracking-[0.22em] text-[color:var(--subtle)]"
                >
                  {labels[name]}
                </label>
                <input
                  id={name}
                  type={types[name]}
                  autoComplete={autocompletes[name]}
                  {...register(name)}
                  className="mt-3 w-full bg-transparent border-b border-[color:var(--border-strong)] py-3 text-base focus:border-[color:var(--accent)] focus:outline-none transition-colors"
                />
                {errors[name] ? (
                  <p className="mt-2 text-xs text-[color:var(--danger)]">{errors[name]?.message}</p>
                ) : null}
              </div>
            );
          })}

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-between border border-[color:var(--foreground)] px-6 py-4 text-sm uppercase tracking-[0.2em] hover:bg-[color:var(--foreground)] hover:text-[color:var(--background)] transition-colors disabled:opacity-50"
          >
            <span>{submitting ? "Creating…" : "Create account"}</span>
            <span aria-hidden>→</span>
          </button>

          <p className="text-sm text-[color:var(--muted)]">
            Already have one?{" "}
            <Link
              href="/login"
              className="border-b border-[color:var(--foreground)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]"
            >
              Sign in
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
