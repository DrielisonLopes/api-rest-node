import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { createAuthenticatedUser } from "../helpers/auth";

describe("Cities - GetById", () => {
    let accessToken = "";

    beforeAll(async () => {
        accessToken = await createAuthenticatedUser();
    });
    it("Search record by id", async () => {
        const res1 = await testServer
            .post("/cities")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({ name: "Rio de Janeiro" });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resSearched = await testServer
            .get(`/cities/${res1.body}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

        expect(resSearched.statusCode).toEqual(StatusCodes.OK);
        expect(resSearched.body).toHaveProperty("name");
    });
    it("Try to search a record that doesn't exist", async () => {
        const res1 = await testServer
            .get("/cities/99999")
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });
});
