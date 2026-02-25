import { StatusCodes } from "http-status-codes";

import { createAuthenticatedUser } from "../helpers/auth";
import { createTestCity } from "../helpers/cities";
import { testServer } from "../jest.setup";

describe("People - GetAll", () => {
    let cityId: number | undefined = undefined;
    let accessToken = "";

    beforeAll(async () => {
        accessToken = await createAuthenticatedUser();
        cityId = await createTestCity(accessToken);
    });

    it("Busca registros", async () => {
        const res1 = await testServer
            .post("/people")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                cityId,
                email: "jucagetall@gmail.com",
                fullName: "Juca Silva",
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get("/people")
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

        expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});
