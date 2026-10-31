"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Honeypot } from "@/components/forms/Honeypot";
import { FormError } from "@/components/forms/FormError";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { useLeadForm } from "@/components/forms/useLeadForm";
import { popupAlertsSchema, fleetQuoteSchema } from "@/lib/lead-schema";
import { registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Tab = "alerts" | "fleet";

/** Homepage hero lead card with Pop-Up alerts / Fleet quote tabs. Tab switch cross-fades the panel. */
export function LeadCard() {
  const [tab, setTab] = useState<Tab>("alerts");
  const panel = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const tabs = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const gsap = registerGsap();
      // slide the underline to the active tab
      const active = tabs.current?.querySelector<HTMLElement>('[aria-selected="true"]');
      if (active && indicator.current) {
        gsap.to(indicator.current, { x: active.offsetLeft, width: active.offsetWidth, duration: prefersReducedMotion() ? 0 : 0.45, ease: "power3.out" });
      }
      if (panel.current && !prefersReducedMotion()) {
        gsap.fromTo(panel.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" });
      }
    },
    { dependencies: [tab] },
  );

  return (
    <Card tone="glass" className="shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]">
      <div className="p-7 sm:p-8">
        <div ref={tabs} role="tablist" aria-label="Lead type" className="relative flex gap-6 border-b border-white/10">
          {(
            [
              ["alerts", "Pop-Up alerts"],
              ["fleet", "Fleet quote"],
            ] as const
          ).map(([k, l]) => (
            <button
              key={k}
              role="tab"
              type="button"
              aria-selected={tab === k}
              aria-controls={`lead-panel-${k}`}
              onClick={() => setTab(k)}
              className={cn("label relative pb-3 text-[11px] tracking-[0.14em] transition-colors duration-300", tab === k ? "text-orange" : "text-white/50 hover:text-white")}
            >
              {l}
            </button>
          ))}
          <span ref={indicator} className="absolute -bottom-px left-0 h-[2px] w-0 bg-orange" aria-hidden />
        </div>
        <div ref={panel} id={`lead-panel-${tab}`} role="tabpanel" className="mt-6">
          {tab === "alerts" ? <AlertsForm /> : <FleetForm />}
        </div>
      </div>
    </Card>
  );
}

function AlertsForm() {
  const f = useLeadForm(popupAlertsSchema, () => ({ type: "popup-alerts" }));
  if (f.done) return <FormSuccess title="You're" accent="in." body="We'll text you before each weekend with the lot and hours." onReset={f.reset} />;
  return (
    <form key={f.key} onSubmit={f.onSubmit} onChange={f.onChange} noValidate className="relative flex flex-col gap-4">
      <Honeypot />
      <h2 className="display text-[28px] not-italic">Never miss a pop-up.</h2>
      <p className="text-[14px] leading-[1.5] text-white/65">One text and email before each weekend: where we&apos;ll be and when. No spam.</p>
      <Field label="Name" name="name" placeholder="Your name" autoComplete="name" error={f.errors.name} />
      <Field label="Mobile" name="phone" type="tel" inputMode="tel" placeholder="(901) 000-0000" autoComplete="tel" error={f.errors.phone} />
      <Field label="Email (optional)" name="email" type="email" inputMode="email" placeholder="you@email.com" autoComplete="email" error={f.errors.email} />
      <Button type="submit" full loading={f.busy}>
        {f.busy ? "Sending" : "Text me the next lot"}
      </Button>
      <FormError message={f.status === "error" ? f.message : ""} />
      <p className="flex items-center gap-2 text-[12px] text-white/55">
        <span className="flex -space-x-1.5" aria-hidden>
          {["BT", "MJ", "TW"].map((i) => (
            <span key={i} className="flex h-5 w-5 items-center justify-center rounded-full bg-orange text-[8px] font-bold text-ink ring-2 ring-ink">
              {i}
            </span>
          ))}
        </span>
        Join 2,000+ Memphis drivers on the list
      </p>
      <p className="text-[10px] leading-[1.5] text-white/35">By signing up you agree to receive texts and emails from Grind City Detail. Msg &amp; data rates may apply. Reply STOP to opt out.</p>
    </form>
  );
}

function FleetForm() {
  const f = useLeadForm(fleetQuoteSchema, () => ({ type: "fleet-quote" }));
  if (f.done) return <FormSuccess title="Got it." accent="Quote incoming." body="We'll call you back within one business day." onReset={f.reset} />;
  return (
    <form key={f.key} onSubmit={f.onSubmit} onChange={f.onChange} noValidate className="relative flex flex-col gap-4">
      <Honeypot />
      <h2 className="display text-[28px] not-italic">Get your fleet quote.</h2>
      <p className="text-[14px] leading-[1.5] text-white/65">Tell us what you run. We quote within one business day.</p>
      <Field label="Company" name="company" placeholder="Company name" autoComplete="organization" error={f.errors.company} />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Vehicles" name="vehicles" placeholder="How many?" inputMode="numeric" error={f.errors.vehicles} />
        <Field label="Frequency" name="frequency" as="select" options={["Weekly", "Bi-weekly", "Monthly"]} defaultValue="Bi-weekly" />
      </div>
      <Field label="Your name" name="name" placeholder="Full name" autoComplete="name" error={f.errors.name} />
      <Field label="Phone" name="phone" type="tel" inputMode="tel" placeholder="(901) 000-0000" autoComplete="tel" error={f.errors.phone} />
      <Button type="submit" full loading={f.busy}>
        {f.busy ? "Sending" : "Get my fleet quote"}
      </Button>
      <FormError message={f.status === "error" ? f.message : ""} />
    </form>
  );
}
