import { test as teardown } from "@playwright/test";

teardown("Print logs", async () => {
  console.log("The execution is completed!");
});
