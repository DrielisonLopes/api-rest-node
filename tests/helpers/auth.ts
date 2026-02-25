import { testServer } from "../jest.setup";

export const createAuthenticatedUser = async () => {
    await testServer.post("/register").send({
        name: "Test User",
        email: "cities@test.com",
        password: "123456",
    });

    const login = await testServer.post("/enter").send({
        email: "cities@test.com",
        password: "123456",
    });

    return login.body.accessToken;
};
