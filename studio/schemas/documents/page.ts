import { defineField, defineType } from "sanity";

/** One document per route. Slug must match the Next.js route key used in buildMetadata(). */
export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Page", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Route key",
      type: "slug",
      description: "Must match the site route: home, pop-up, fleet, employers, about, reviews, privacy",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current", media: "seo.ogImage" } },
});
