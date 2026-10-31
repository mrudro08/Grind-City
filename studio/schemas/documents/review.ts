import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "quote", type: "text", rows: 3, validation: (r) => r.required().max(300) }),
    defineField({ name: "name", title: "Reviewer", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role / context", type: "string", description: "e.g. Weekend customer · Midtown" }),
    defineField({ name: "category", type: "string", options: { list: ["pop-up", "employers", "fleet"], layout: "radio" }, validation: (r) => r.required() }),
    defineField({ name: "rating", type: "number", initialValue: 5, validation: (r) => r.min(1).max(5) }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [{ title: "Manual order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "quote" } },
});
