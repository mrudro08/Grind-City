import type { StructureResolver } from "sanity/structure";

/** Studio sidebar: settings singleton first, then SEO per page, content, and leads. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem().title("Site settings & default SEO").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("page").title("Pages (SEO)"),
      S.divider(),
      S.documentTypeListItem("popupEvent").title("Pop-up events"),
      S.documentTypeListItem("review").title("Reviews"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.documentTypeListItem("washPackage").title("Wash packages"),
      S.documentTypeListItem("fleetPlan").title("Fleet plans"),
      S.documentTypeListItem("crewMember").title("Crew"),
      S.documentTypeListItem("stat").title("Stats"),
      S.divider(),
      S.documentTypeListItem("lead").title("Leads (inbox)"),
    ]);
