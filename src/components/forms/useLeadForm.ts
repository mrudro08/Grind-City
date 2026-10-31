"use client";
import { useCallback, useState, type FormEvent } from "react";
import type { z } from "zod";
import { fieldErrors } from "@/lib/lead-schema";
import { postLead } from "@/lib/lead";
import type { Lead } from "@/lib/lead-schema";

export type FormStatus = "idle" | "busy" | "done" | "error";

/**
 * Shared behaviour for every lead form:
 * - collects FormData + any extra controlled values
 * - validates with the same zod schema the API uses (instant, inline errors)
 * - clears a field's error as soon as the user edits it
 * - posts, exposes status for animated button / success states
 */
export function useLeadForm<S extends z.ZodType<Lead>>(schema: S, extra: () => Record<string, unknown> = () => ({})) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string>("");
  // Bumping the key remounts the <form>, which clears every field without touching the DOM directly.
  const [key, setKey] = useState(0);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (status === "busy") return;
      const data = { ...Object.fromEntries(new FormData(e.currentTarget).entries()), ...extra() };
      const parsed = schema.safeParse(data);
      if (!parsed.success) {
        const errs = fieldErrors(parsed.error);
        setErrors(errs);
        const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
        first?.focus();
        return;
      }
      setErrors({});
      setStatus("busy");
      const res = await postLead(parsed.data);
      if (res.ok) {
        setStatus("done");
      } else {
        setMessage(res.message);
        setStatus("error");
      }
    },
    [schema, extra, status],
  );

  /** Attach to the <form> so edits clear that field's error. */
  const onChange = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      const name = (e.target as HTMLInputElement).name;
      if (name && errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
      if (status === "error") setStatus("idle");
    },
    [errors, status],
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setErrors({});
    setMessage("");
    setKey((k) => k + 1);
  }, []);

  return { status, errors, message, onSubmit, onChange, reset, key, busy: status === "busy", done: status === "done" };
}
