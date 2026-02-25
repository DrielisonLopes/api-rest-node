import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { createAuthenticatedUser } from "../helpers/auth";

describe("Cities - Create", () => {
    let accessToken = "";

    beforeAll(async () => {
        accessToken = await createAuthenticatedUser();
    });

    it("Create registration", async () => {
        const res1 = await testServer
            .post("/cities")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({ name: "Rio de Janeiro " });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
    });
    it("Try creating a record with a very short name", async () => {
        const res1 = await testServer
            .post("/cities")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({ name: "Di" });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.name");
    });
});
