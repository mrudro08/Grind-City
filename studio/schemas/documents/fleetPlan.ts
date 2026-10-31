import { defineField, defineType } from "sanity";

export const fleetPlan = defineType({
  name: "fleetPlan",
  title: "Fleet plan",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "blurb", type: "string" }),
    defineField({ name: "price", title: "Starting price per vehicle", type: "string" }),
    defineField({ name: "features", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "popular", title: "Most popular", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [{ title: "Manual order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "price" } },
});
