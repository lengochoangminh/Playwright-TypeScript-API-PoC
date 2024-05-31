//COVERAGE_TAG: GET /booking/
//COVERAGE_TAG: GET /booking/{id}
//COVERAGE_TAG: GET /booking/summary

import { test, expect } from "@playwright/test";
import { validateJsonSchema } from "@helpers/validateJsonSchema";
import { createInvalidHeaders } from "@helpers/createHeaders";
import { isValidDate } from "@helpers/date";

test.describe("booking/ GET requests @booking", async () => {

  test("GET booking summary with specific room id @smoke", async ({
    request,
  }) => {
    const response = await request.get("booking/summary?roomid=1");

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.bookings.length).toBeGreaterThanOrEqual(1);
    expect(isValidDate(body.bookings[0].bookingDates.checkin)).toBe(true);
    expect(isValidDate(body.bookings[0].bookingDates.checkout)).toBe(true);

    await validateJsonSchema("GET_booking_summary", "booking", body);
  });

  test("GET booking summary with specific room id that doesn't exist", async ({
    request,
  }) => {
    const response = await request.get("booking/summary?roomid=999999");

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.bookings.length).toBe(0);
  });

  test("GET booking summary with specific room id that is empty", async ({
    request,
  }) => {
    const response = await request.get("booking/summary?roomid=");

    expect(response.status()).toBe(500);

    const body = await response.json();
    expect(isValidDate(body.timestamp)).toBe(true);
    expect(body.status).toBe(500);
    expect(body.error).toBe("Internal Server Error");
    expect(body.path).toBe("/booking/summary");
  });

  test("GET all bookings with details @smoke", async ({ request }) => {
    const response = await request.get("booking/");
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.bookings.length).toBeGreaterThanOrEqual(1);
    await validateJsonSchema("GET_all_bookings", "booking", body);

    /** Unstable Test Data 
    expect(body.bookings[0].bookingid).toBe(1);
    expect(body.bookings[0].roomid).toBe(1);
    expect(body.bookings[0].firstname).toBe("James");
    expect(body.bookings[0].lastname).toBe("Dean");
    expect(body.bookings[0].depositpaid).toBe(true);
    expect(isValidDate(body.bookings[0].bookingdates.checkin)).toBe(true);
    expect(isValidDate(body.bookings[0].bookingdates.checkout)).toBe(true);
    */
  });

  test("GET all bookings with details with invalid authentication", async ({
    request,
  }) => {
    const response = await request.get("booking/", {
      headers: await createInvalidHeaders(),
    });

    expect(response.status()).toBe(403);

    const body = await response.text();
    expect(body).toBe("");
  });

  test("GET booking by id with details", async ({ request }) => {
    const response = await request.get("booking/160");

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.bookingid).toBe(160);
    expect(body.roomid).toBe(7177);
    expect(body.firstname).toBe("Namis");
    expect(body.lastname).toBe("Family");
    expect(body.depositpaid).toBe(true);

    expect(isValidDate(body.bookingdates.checkin)).toBe(true);
    expect(isValidDate(body.bookingdates.checkout)).toBe(true);

    await validateJsonSchema("GET_booking_id", "booking", body);
  });

  test("GET booking by id that doesn't exist", async ({ request }) => {
    const response = await request.get("booking/999999");

    expect(response.status()).toBe(404);

    const body = await response.text();
    expect(body).toBe("");
  });
});
