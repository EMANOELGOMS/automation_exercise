import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "pb7ze5",
  // ...rest of the Cypress project config
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
