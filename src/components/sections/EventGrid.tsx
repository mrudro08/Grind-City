"use client";
import { useState } from "react";
import type { PopupEvent } from "@/data/events";
import { areas } from "@/data/events";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

function icsHref(e: PopupEvent) {
  const d = (s: string) => s.replace(/-/g, "");
  const end = new Date(e.end);
  end.setDate(end.getDate() + 1);
  const body = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", `SUMMARY:Grind City Detail pop-up — ${e.lot}`, `DTSTART;VALUE=DATE:${d(e.start)}`, `DTEND;VALUE=DATE:${d(end.toISOString().slice(0, 10))}`, `LOCATION:${e.address}`, "END:VEVENT", "END:VCALENDAR"].join("\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
}

const statusLabel = { live: "Live now", confirmed: "Confirmed", tentative: "Tentative" } as const;

export function EventGrid({ events }: { events: PopupEvent[] }) {
  const [area, setArea] = useState(areas[0]);
  const list = area === "All areas" ? events : events.filter((e) => e.area === area);
  return (
    <div>
      <div role="tablist" aria-label="Filter by area" className="mb-10 flex flex-wrap gap-3">
        {areas.map((a) => (
          <button key={a} type="button" role="tab" aria-selected={area === a} onClick={() => setArea(a)} className={cn("cut-xs p-px transition-colors", area === a ? "bg-orange" : "bg-ink/15 hover:bg-ink")}>
            <span className={cn("cut-xs label block px-4 py-2.5 text-[11px]", area === a ? "bg-orange text-ink" : "bg-white text-ink")}>{a}</span>
          </button>
        ))}
      </div>
      <Reveal stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {list.map((e) => {
          const live = e.status === "live";
          return (
            <Card key={e.slug} tone={live ? "dark" : "light"} stroke={live ? "bg-orange" : undefined} lift>
              <article className="flex h-full flex-col p-7">
                <div className="flex items-center justify-between">
                  <Tag hot={live} light={live}>
                    {e.dateLabel}
                  </Tag>
                  <span className={cn("label text-[10px]", live ? "text-orange" : e.status === "tentative" ? "text-ash" : "text-ink/60")}>{statusLabel[e.status]}</span>
                </div>
                <h3 className="display mt-6 text-[26px]">{e.lot}</h3>
                <p className={cn("mt-1 text-[14px]", live ? "text-white/60" : "text-smoke")}>
                  {e.area}, Memphis
                </p>
                <p className={cn("mt-4 text-[13px]", live ? "text-white/60" : "text-ash")}>{e.hours.map((h) => `${h.day} ${h.time.replace(/:00/g, "").replace(/ /g, "")}`).join(" · ")}</p>
                <div className={cn("mt-6 flex items-center justify-between border-t pt-5", live ? "border-white/10" : "border-ink/10")}>
                  <a href={icsHref(e)} download={`${e.slug}.ics`} className={cn("label flex items-center gap-2 text-[11px] hover:text-orange", live ? "text-white/70" : "text-ink/70")}>
                    <span className="slant inline-block h-3 w-2 bg-orange" aria-hidden /> Add to calendar
                  </a>
                  {live ? (
                    <Button href={e.mapUrl} className="scale-90 origin-right">
                      Directions
                    </Button>
                  ) : (
                    <a href="#alerts" className="label text-[11px] text-ink/70 hover:text-orange">
                      Remind me →
                    </a>
                  )}
                </div>
              </article>
            </Card>
          );
        })}
      </Reveal>
    </div>
  );
}
