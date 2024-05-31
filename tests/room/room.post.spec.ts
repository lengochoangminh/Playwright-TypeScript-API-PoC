//COVERAGE_TAG: POST /room/

import { createRandomRoomBody } from "@datafactory/room";
import { validateJsonSchema } from "@helpers/validateJsonSchema";
import { test, expect } from "@playwright/test";

test.describe("room/ POST requests @room", async () => {
    let updateRoomBody;

    test.beforeEach(async () => {

        updateRoomBody = await createRandomRoomBody();
    });

    test("POST /room to create a room @smoke", async ({ request }) => {
        const response = await request.post(`/room/`, {
            data: updateRoomBody,
        });

        expect(response.status()).toBe(201);
        const body = await response.json();

        expect(body.name).toEqual(updateRoomBody.name);
        expect(body.accessible).toEqual(updateRoomBody.accessible);
        expect(body.description).toEqual(updateRoomBody.description);
        expect(body.features).toEqual(updateRoomBody.features);
        expect(body.image).toEqual(updateRoomBody.image);
        expect(body.roomName).toEqual(updateRoomBody.roomName);
        expect(body.type).toEqual(updateRoomBody.type);

        await validateJsonSchema("POST_room", "room", body);
    });
});