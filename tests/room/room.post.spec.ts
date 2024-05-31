import { test, expect } from '@playwright/test';

test("POST /room to create a room @happy", async ({ request }) => {

    const response = await request.post("https://automationintesting.online/auth/login", {
        data: {
            username: "admin",
            password: "password",
        },
    });

    expect(response.status()).toBe(200);
    const headers = response.headers();
    const cookies = headers["set-cookie"];

    const response_create_room = await request.post("https://automationintesting.online/room/", {
        headers: cookies,
        data: {
            "roomName": "709",
            "type": "Double",
            "accessible": false,
            "image": "https://loremflickr.com/500/500/cat?lock=8887566256308224",
            "description": "I'll program the haptic SSD feed, that should interface the SQL circuit!",
            "features": [
                "Heating",
                "Air Conditioning",
                "Sea View"
            ],
            "roomPrice": "343"
        },
    });

    expect(response_create_room.status()).toBe(201);
    const body = await response_create_room.json()
    console.log(JSON.stringify(body.roomid));
});


