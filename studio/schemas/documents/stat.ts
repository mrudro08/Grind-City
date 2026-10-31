import { defineField, defineType } from "sanity";

export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "document",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", type: "number", validation: (r) => r.required() }),
    defineField({ name: "decimals", type: "number", initialValue: 0 }),
    defineField({ name: "suffix", type: "string", description: "K+, +, ★" }),
    defineField({ name: "sub", title: "Sub-label", type: "string" }),
    defineField({ name: "pct", title: "Bar fill %", type: "number", validation: (r) => r.min(0).max(100) }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [{ title: "Manual order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "label", subtitle: "value" } },
});
