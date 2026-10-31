"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Honeypot } from "@/components/forms/Honeypot";
import { FormError } from "@/components/forms/FormError";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { Chips } from "@/components/forms/Chips";
import { useLeadForm } from "@/components/forms/useLeadForm";
import { fleetQuoteSchema } from "@/lib/lead-schema";
import { cn } from "@/lib/cn";

const freqs = ["Weekly", "Bi-weekly", "Monthly", "Not sure"];

/** Full fleet quote form (hero + bottom section). */
export function FleetQuoteForm({ compact = false }: { compact?: boolean }) {
  const [freq, setFreq] = useState("Bi-weekly");
  const f = useLeadForm(fleetQuoteSchema, () => ({ type: "fleet-quote", frequency: freq }));

  return (
    <Card tone={compact ? "glass" : "dark"} stroke={compact ? undefined : "bg-ink"} className={cn(compact && "shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]")}>
      <div className={cn(compact ? "p-7 sm:p-8" : "p-7 sm:p-10")}>
        {f.done ? (
          <FormSuccess title="Got it." accent="Quote incoming." body="We'll call or email within one business day with your per-vehicle number." onReset={f.reset} />
        ) : (
          <form key={f.key} onSubmit={f.onSubmit} onChange={f.onChange} noValidate className="relative flex flex-col gap-4">
            <Honeypot />
            <div>
              <h2 className={cn("display not-italic", compact ? "text-[28px]" : "text-[32px]")}>{compact ? "Get your fleet quote." : "Your fleet"}</h2>
              {compact && <p className="mt-2 text-[14px] text-white/65">Tell us what you run and we&apos;ll quote within 1 business day.</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company" name="company" placeholder="Company name" autoComplete="organization" error={f.errors.company} />
              <Field label="Yard / location" name="location" placeholder="City or ZIP" error={f.errors.location} />
              <Field label="Vehicles" name="vehicles" placeholder="How many?" inputMode="numeric" error={f.errors.vehicles} />
              <Field label="Vehicle types" name="types" as="select" options={["Vans", "Box trucks", "Pickups", "Tractors", "Mixed fleet"]} />
            </div>
            <Chips label="How often?" options={freqs} value={freq} onChange={setFreq} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your name" name="name" placeholder="Full name" autoComplete="name" error={f.errors.name} />
              <Field label="Phone" name="phone" type="tel" inputMode="tel" placeholder="Best number to reach you" autoComplete="tel" error={f.errors.phone} />
              <Field label="Work email" name="email" type="email" inputMode="email" placeholder="you@company.com" autoComplete="email" className="sm:col-span-2" error={f.errors.email} />
            </div>
            <Button type="submit" full loading={f.busy}>
              {f.busy ? "Sending" : "Get my fleet quote"}
            </Button>
            <FormError message={f.status === "error" ? f.message : ""} />
            <p className="text-[11px] text-white/40">Quotes are per vehicle, per wash. No obligation.</p>
          </form>
        )}
      </div>
    </Card>
  );
}
