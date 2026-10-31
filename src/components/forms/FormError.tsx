"use client";
import { cn } from "@/lib/cn";

/** Inline server/network error that slides open under the submit button. */
export function FormError({ message, dark = true }: { message: string; dark?: boolean }) {
  return (
    <div className={cn("grid transition-[grid-template-rows,opacity] duration-300 ease-out", message ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")} role="alert" aria-live="assertive">
      <div className="overflow-hidden">
        <p className={cn("cut-xs flex items-center gap-2 px-3 py-2 text-[13px]", dark ? "bg-red-500/15 text-red-300" : "bg-red-50 text-red-700")}>
          <span className="slant inline-block h-3 w-2 bg-red-400" aria-hidden /> {message}
        </p>
      </div>
    </div>
  );
}
