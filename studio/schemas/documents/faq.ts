import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "q", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "a", title: "Answer", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "pages", title: "Show on", type: "array", of: [{ type: "string" }], options: { list: ["home", "pop-up", "fleet", "employers"] } }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [{ title: "Manual order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "q" } },
});
