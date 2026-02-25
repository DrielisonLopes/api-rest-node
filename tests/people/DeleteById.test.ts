import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";
import { createAuthenticatedUser } from "../helpers/auth";
import { createTestCity } from "../helpers/cities";

describe("People - DeleteById", () => {
    let cityId: number | undefined = undefined;
    let accessToken = "";

    beforeAll(async () => {
        accessToken = await createAuthenticatedUser();
        cityId = await createTestCity(accessToken);
    });

    it("Apaga registro", async () => {
        const res1 = await testServer
            .post("/people")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                cityId,
                email: "jucadelete@gmail.com",
                fullName: "Juca Silva",
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/people/${res1.body}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it("Tenta apagar registro que não existe", async () => {
        const res1 = await testServer
            .delete("/people/99999")
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });
});
