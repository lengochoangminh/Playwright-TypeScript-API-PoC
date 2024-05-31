import { test, expect } from "@playwright/test";
import { isValidDate } from "@helpers/date";

test.describe("booking/ GET requests @booking", async () => {
  test("GET booking by id with details", async ({ page }) => {
    await page.route("booking/10000", (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          bookingid: 1,
          roomid: 1,
          firstname: "Minh",
          lastname: "Le",
          depositpaid: true,
          bookingdates: {
            checkin: "2022-02-01",
            checkout: "2022-02-05",
          },
        }),
      })
    );

    const response = await page.goto("booking/10000");

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.bookingid).toBe(1);
    expect(body.roomid).toBe(1);
    expect(body.firstname).toBe("Minh");
    expect(body.lastname).toBe("Le");
    expect(body.depositpaid).toBe(true);

    expect(isValidDate(body.bookingdates.checkin)).toBe(true);
    expect(isValidDate(body.bookingdates.checkout)).toBe(true);
  });
});
