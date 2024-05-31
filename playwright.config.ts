import { defineConfig } from "@playwright/test";
import { testPlanFilter } from "allure-playwright/dist/testplan";

/* eslint-disable */
switch (process.env.env) {
  case "dev":
    require("dotenv").config({ path: "./environments/dev.env" });
    break;
  case "qa":
    require("dotenv").config({ path: "./environments/qa.env" });
    break;
  default:
    require("dotenv").config({ path: "./environments/dev.env" });
}

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  grep: testPlanFilter(),
  reporter: [['html', { open: 'never' }], ["allure-playwright"]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.URL,
    ignoreHTTPSErrors: true,
    trace: "retain-on-failure",
  },

  projects: [
    { name: "setup", testMatch: /tests\/setup.ts/ },
    {
      name: "room-api-checks",
      use: {
        storageState: ".auth/admin.json",
      },
      testMatch: /tests\/room/,
      dependencies: ["setup"],
    },
    {
      name: "booking-api-checks",
      use: {
        storageState: ".auth/admin.json",
      },
      testMatch: /tests\/booking/,
      dependencies: ["room-api-checks"],
    },
    {
      name: "test-coverage",
      testMatch: /coverage.ts/,
      dependencies: ["booking-api-checks"],
    },
  ],
});
