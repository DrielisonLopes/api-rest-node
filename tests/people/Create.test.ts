import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { createAuthenticatedUser } from "../helpers/auth";
import { createTestCity } from "../helpers/cities";

describe("People - Create", () => {
    let cityId: number | undefined = undefined;
    let accessToken = "";

    beforeAll(async () => {
        accessToken = await createAuthenticatedUser();
        cityId = await createTestCity(accessToken);
    });

    it("Cria registro", async () => {
        const res1 = await testServer
            .post("/people")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                cityId,
                email: "juca@gmail.com",
                fullName: "Juca Silva",
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
    });

    it("Tenta criar registro com email inválido", async () => {
        const res1 = await testServer
            .post("/people")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                cityId,
                email: "juca gmail.com",
                fullName: "Juca da Silva",
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.email");
    });
    it("Tenta criar registro sem cityId", async () => {
        const res1 = await testServer
            .post("/people")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                email: "juca@gmail.com",
                fullName: "Juca da Silva",
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.cityId");
    });
    it("Tenta criar registro com cityId inválido", async () => {
        const res1 = await testServer
            .post("/people")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                cityId: "teste",
                email: "juca@gmail.com",
                fullName: "Juca da Silva",
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.cityId");
    });
    it("Tenta criar registro sem enviar nenhuma propriedade", async () => {
        const res1 = await testServer
            .post("/people")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.email");
        expect(res1.body).toHaveProperty("errors.body.cityId");
        expect(res1.body).toHaveProperty("errors.body.fullName");
    });
});
