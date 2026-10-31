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
import { employerDaySchema } from "@/lib/lead-schema";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

const pays = ["Employer-paid", "Shared cost", "Associate-paid"];

/** Employee Appreciation Day request form (hero + "Pick your date"). */
export function EmployerForm({ compact = false }: { compact?: boolean }) {
  const [pay, setPay] = useState(pays[0]);
  const f = useLeadForm(employerDaySchema, () => ({ type: "employer-day", pay }));

  return (
    <Card tone="glass" className={cn(compact && "shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]")}>
      <div className={cn(compact ? "p-7 sm:p-8" : "p-7 sm:p-10")}>
        {f.done ? (
          <FormSuccess title="Date request" accent="received." body="We'll call you back within one business day to lock it in." onReset={f.reset} />
        ) : (
          <form key={f.key} onSubmit={f.onSubmit} onChange={f.onChange} noValidate className="relative flex flex-col gap-4">
            <Honeypot />
            <div>
              <h2 className={cn("display not-italic", compact ? "text-[28px]" : "text-[32px]")}>{compact ? "Plan your appreciation day." : "Request a date"}</h2>
              {compact && <p className="mt-2 text-[14px] text-white/65">Pick a date and we&apos;ll call you back with your number. 30-car minimum.</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company" name="company" placeholder="Company name" autoComplete="organization" error={f.errors.company} />
              <Field label="Team size" name="teamSize" placeholder="How many people on site?" inputMode="numeric" error={f.errors.teamSize} />
              {!compact && (
                <>
                  <Field label="Preferred date" name="date" type="date" error={f.errors.date} />
                  <Field label="Site ZIP" name="zip" placeholder="ZIP code" inputMode="numeric" autoComplete="postal-code" error={f.errors.zip} />
                </>
              )}
            </div>
            {!compact && <Chips label="How will your company pay?" options={pays} value={pay} onChange={setPay} />}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your name" name="name" placeholder="Full name" autoComplete="name" error={f.errors.name} />
              <Field label="Phone" name="phone" type="tel" inputMode="tel" placeholder="Best number to reach you" autoComplete="tel" error={f.errors.phone} />
              <Field label="Work email" name="email" type="email" inputMode="email" placeholder="you@company.com" autoComplete="email" className="sm:col-span-2" error={f.errors.email} />
            </div>
            <Button type="submit" full loading={f.busy}>
              {f.busy ? "Sending" : "Request a date"}
            </Button>
            <FormError message={f.status === "error" ? f.message : ""} />
            <p className="text-[12px] text-white/50">
              Or call{" "}
              <a href={site.phoneHref} className="font-semibold text-white hover:text-orange">
                {site.phone}
              </a>
            </p>
          </form>
        )}
      </div>
    </Card>
  );
}
