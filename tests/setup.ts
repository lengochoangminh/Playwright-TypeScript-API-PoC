import { getEndpointCoverage } from "@helpers/coverage";
import { test as coverage } from "@playwright/test";
import { test as setup } from "@playwright/test";

coverage("calculate coverage", async () => {
  await getEndpointCoverage("booking");
  await getEndpointCoverage("room");
});

const username = process.env.ADMIN_NAME;
const password = process.env.ADMIN_PASSWORD;
const authFile = ".auth/admin.json";

setup("authenticate", async ({ request, baseURL }) => {
  await request.post(baseURL + "auth/login", {
    data: { username: username, password: password },
  });
  await request.storageState({ path: authFile });
});
