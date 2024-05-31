//COVERAGE_TAG: DELETE /booking/{id}

import { test, expect } from "@playwright/test";
import { getBookingSummary, createFutureBooking } from "@datafactory/booking";
import { createRoom } from "@datafactory/room";
import { createInvalidHeaders } from "@helpers/createHeaders";

test.describe("booking/{id} DELETE requests @booking", async () => {
  let bookingId;
  let roomId;

  test.beforeEach(async () => {
    const room = await createRoom();
    roomId = room.roomid;
    const futureBooking = await createFutureBooking(roomId);
    bookingId = futureBooking.bookingid;
  });

  test("DELETE booking with specific room id: @happy", async ({ request }) => {
    const response = await request.delete(`booking/${bookingId}`);

    expect(response.status()).toBe(202);

    const body = await response.text();
    expect(body).toBe("");

    const getBooking = await getBookingSummary(roomId);
    expect(getBooking.bookings.length).toBe(0);
  });

  test("DELETE booking with an id that doesn't exist", async ({ request }) => {
    const response = await request.delete("booking/999999");

    expect(response.status()).toBe(404);

    const body = await response.text();
    expect(body).toBe("");
  });

  test("DELETE booking id with the invalid authentication", async ({
    request,
  }) => {
    const response = await request.delete(`booking/${bookingId}`, {
      headers: await createInvalidHeaders(),
    });

    expect(response.status()).toBe(403);

    const body = await response.text();
    expect(body).toBe("");
  });
});
