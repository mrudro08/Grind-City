import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "business", title: "Business", default: true },
    { name: "seo", title: "Default SEO" },
    { name: "social", title: "Social" },
  ],
  fields: [
    defineField({ name: "siteName", title: "Site name", type: "string", group: "business", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string", group: "business" }),
    defineField({ name: "description", title: "Business description", type: "text", rows: 3, group: "business" }),
    defineField({ name: "phone", title: "Phone", type: "string", group: "business" }),
    defineField({ name: "email", title: "Email", type: "string", group: "business" }),
    defineField({ name: "city", title: "City", type: "string", group: "business", initialValue: "Memphis" }),
    defineField({ name: "region", title: "State", type: "string", group: "business", initialValue: "TN" }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "object",
      group: "business",
      fields: [
        defineField({ name: "popups", title: "Pop-up days", type: "string" }),
        defineField({ name: "weekdays", title: "Weekday work", type: "string" }),
      ],
    }),
    defineField({
      name: "rating",
      title: "Google rating",
      type: "object",
      group: "business",
      fields: [
        defineField({ name: "value", title: "Rating", type: "number", validation: (r) => r.min(0).max(5) }),
        defineField({ name: "count", title: "Review count", type: "number" }),
      ],
    }),
    defineField({
      name: "social",
      title: "Social links",
      type: "object",
      group: "social",
      fields: [
        defineField({ name: "instagram", type: "url" }),
        defineField({ name: "tiktok", type: "url" }),
        defineField({ name: "facebook", type: "url" }),
      ],
    }),
    defineField({ name: "twitterHandle", title: "X / Twitter handle", type: "string", group: "social", description: "e.g. @grindcitydetail" }),
    defineField({
      name: "titleTemplate",
      title: "Title template",
      type: "string",
      group: "seo",
      description: "How page titles are composed. %s is replaced with the page's meta title.",
      initialValue: "%s · Grind City Detail",
    }),
    defineField({ name: "seo", title: "Default SEO (used when a page leaves a field empty)", type: "seo", group: "seo" }),
    defineField({ name: "googleSiteVerification", title: "Google Search Console verification code", type: "string", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Site settings & default SEO" }) },
});
