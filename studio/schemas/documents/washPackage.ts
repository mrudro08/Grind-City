import { defineField, defineType } from "sanity";

export const washPackage = defineType({
  name: "washPackage",
  title: "Wash package",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "n", title: "Number", type: "string", description: "01, 02, 03" }),
    defineField({ name: "blurb", type: "string" }),
    defineField({ name: "price", title: "Starting price", type: "string", description: "e.g. $35" }),
    defineField({ name: "features", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "popular", title: "Most popular", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [{ title: "Manual order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "price" } },
});
