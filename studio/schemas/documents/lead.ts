import { defineField, defineType } from "sanity";

/** Written by /api/lead. Editors triage leads here until a CRM takes over. */
export const lead = defineType({
  name: "lead",
  title: "Lead",
  type: "document",
  readOnly: ({ currentUser }) => !currentUser?.roles.some((r) => r.name === "administrator"),
  fields: [
    defineField({ name: "type", title: "Type", type: "string", options: { list: ["popup-alerts", "fleet-quote", "employer-day"] } }),
    defineField({ name: "status", title: "Status", type: "string", options: { list: ["new", "contacted", "booked", "closed"], layout: "radio" }, initialValue: "new", readOnly: false }),
    defineField({ name: "receivedAt", title: "Received", type: "datetime" }),
    defineField({ name: "name", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "company", type: "string" }),
    defineField({ name: "teamSize", title: "Team size", type: "string" }),
    defineField({ name: "date", title: "Preferred date", type: "string" }),
    defineField({ name: "zip", title: "ZIP", type: "string" }),
    defineField({ name: "pay", title: "Pay option", type: "string" }),
    defineField({ name: "location", title: "Yard / location", type: "string" }),
    defineField({ name: "vehicles", type: "string" }),
    defineField({ name: "types", title: "Vehicle types", type: "string" }),
    defineField({ name: "frequency", type: "string" }),
    defineField({ name: "page", title: "Submitted from", type: "string" }),
    defineField({ name: "notes", title: "Internal notes", type: "text", rows: 3 }),
  ],
  orderings: [{ title: "Newest", name: "newest", by: [{ field: "receivedAt", direction: "desc" }] }],
  preview: {
    select: { name: "name", type: "type", status: "status", company: "company" },
    prepare: ({ name, type, status, company }) => ({ title: `${name ?? "—"}${company ? ` · ${company}` : ""}`, subtitle: `${type} · ${status}` }),
  },
});
