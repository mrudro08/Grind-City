import { defineField, defineType } from "sanity";

export const popupEvent = defineType({
  name: "popupEvent",
  title: "Pop-up event",
  type: "document",
  fields: [
    defineField({ name: "lot", title: "Lot name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: (doc) => `${doc.lot}-${doc.start}` }, validation: (r) => r.required() }),
    defineField({ name: "area", title: "Area / neighbourhood", type: "string", validation: (r) => r.required() }),
    defineField({ name: "address", type: "string", validation: (r) => r.required() }),
    defineField({ name: "start", title: "First day", type: "date", validation: (r) => r.required() }),
    defineField({ name: "end", title: "Last day", type: "date", validation: (r) => r.required() }),
    defineField({ name: "dateLabel", title: "Date label", type: "string", description: "e.g. Nov 6 – 8" }),
    defineField({
      name: "hours",
      type: "array",
      of: [{ type: "object", fields: [defineField({ name: "day", type: "string" }), defineField({ name: "time", type: "string" })], preview: { select: { title: "day", subtitle: "time" } } }],
    }),
    defineField({ name: "status", type: "string", options: { list: ["live", "confirmed", "tentative"], layout: "radio" }, initialValue: "confirmed" }),
    defineField({ name: "mapUrl", title: "Google Maps link", type: "url" }),
    defineField({ name: "rainNote", title: "Weather / rain note", type: "string", description: "Shown as a banner on the pop-up page when set." }),
  ],
  orderings: [{ title: "Upcoming", name: "start", by: [{ field: "start", direction: "asc" }] }],
  preview: { select: { title: "lot", subtitle: "dateLabel", status: "status" }, prepare: ({ title, subtitle, status }) => ({ title, subtitle: `${subtitle ?? ""} · ${status}` }) },
});
