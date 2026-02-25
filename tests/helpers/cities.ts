import { testServer } from "../jest.setup";

export const createTestCity = async (accessToken: string) => {
    const res = await testServer
        .post("/cities")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ name: "Cidade Teste" });

    return res.body;
};
