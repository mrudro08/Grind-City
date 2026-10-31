import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: { projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "2g5iq8c7", dataset: process.env.SANITY_STUDIO_DATASET ?? "production" },
  // `sanity deploy` → https://grindcitydetail.sanity.studio
  studioHost: "grindcitydetail",
});
