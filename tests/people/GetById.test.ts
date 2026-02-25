import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";
import { createAuthenticatedUser } from "../helpers/auth";
import { createTestCity } from "../helpers/cities";

describe("People - GetById", () => {
    let cityId: number | undefined = undefined;
    let accessToken = "";

    beforeAll(async () => {
        accessToken = await createAuthenticatedUser();
        cityId = await createTestCity(accessToken);
    });

    it("Busca registro por id", async () => {
        const res1 = await testServer
            .post("/people")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                cityId,
                fullName: "Juca Silva",
                email: "jucagetbyid@gmail.com",
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get(`/people/${res1.body}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty("fullName");
    });

    it("Tenta buscar registro que não existe", async () => {
        const res1 = await testServer
            .get("/people/99999")
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });
});
