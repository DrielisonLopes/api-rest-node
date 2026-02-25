import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { createAuthenticatedUser } from "../helpers/auth";

describe("Cities - GetAll", () => {
    let accessToken = "";

    beforeAll(async () => {
        accessToken = await createAuthenticatedUser();
    });
    it("Search all records", async () => {
        const res1 = await testServer
            .post("/cities")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({ name: "Rio de Janeiro" });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resSearched = await testServer
            .get("/cities")
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

        expect(Number(resSearched.header["x-total-count"])).toBeGreaterThan(0);
        expect(resSearched.statusCode).toEqual(StatusCodes.OK);
        expect(resSearched.body.length).toBeGreaterThan(0);
    });
});
