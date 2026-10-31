import { defineField, defineType } from "sanity";

/**
 * Reusable SEO block. Used on every `page` and (as site-wide defaults) on `siteSettings`.
 * Page values override the defaults; anything left empty falls back to the site default,
 * then to the developer fallback in the codebase.
 */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description: "Shown in the browser tab and search results. 50–60 characters is the sweet spot.",
      validation: (r) => r.max(70).warning("Google usually truncates titles longer than ~60 characters."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "The snippet under the title in search results. Aim for 140–160 characters.",
      validation: (r) => r.max(170).warning("Descriptions over ~160 characters get cut off."),
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Optional. Used for the meta keywords tag — low SEO weight, but handy for internal targeting notes.",
    }),
    defineField({
      name: "ogTitle",
      title: "Social share title",
      type: "string",
      description: "Open Graph / Twitter title. Leave empty to reuse the meta title.",
      validation: (r) => r.max(90),
    }),
    defineField({
      name: "ogDescription",
      title: "Social share description",
      type: "text",
      rows: 2,
      description: "Leave empty to reuse the meta description.",
      validation: (r) => r.max(200),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      description: "1200 × 630 px recommended. Shown when the page is shared on Facebook, LinkedIn, iMessage, Slack, X…",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Only set this if the page is a copy of content that lives at another URL.",
    }),
    defineField({ name: "noIndex", title: "Hide from search engines (noindex)", type: "boolean", initialValue: false }),
    defineField({ name: "noFollow", title: "Don't follow links on this page (nofollow)", type: "boolean", initialValue: false }),
  ],
});
