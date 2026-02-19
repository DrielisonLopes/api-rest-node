import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Users - SignIn", () => {
    beforeAll(async () => {
        await testServer.post("/register").send({
            name: "Test User",
            password: "123456",
            email: "testuser@example.com",
        });
    });

    it("should sign in successfully", async () => {
        const response1 = await testServer.post("/enter").send({
            password: "123456",
            email: "testuser@example.com",
        });
        expect(response1.statusCode).toEqual(StatusCodes.OK);
        expect(response1.body).toHaveProperty("accessToken");
    });
    it("should fail with wrong password", async () => {
        const response1 = await testServer.post("/enter").send({
            password: "wrongpassword",
            email: "testuser@example.com",
        });
        expect(response1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(response1.body).toHaveProperty("errors.default");
    });
    it("should fail with wrong email", async () => {
        const response1 = await testServer.post("/enter").send({
            password: "123456",
            email: "wrongemail@example.com",
        });
        expect(response1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(response1.body).toHaveProperty("errors.default");
    });
    it("should fail with invalid email format", async () => {
        const response1 = await testServer.post("/enter").send({
            password: "123456",
            email: "invalid emailformat",
        });
        expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response1.body).toHaveProperty("errors.body.email");
    });
    it("should fail with short password", async () => {
        const response1 = await testServer.post("/enter").send({
            password: "12",
            email: "testuser@example.com",
        });
        expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response1.body).toHaveProperty("errors.body.password");
    });
    it("should fail with missing fields", async () => {
        const response1 = await testServer.post("/enter").send({});
        expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response1.body).toHaveProperty("errors.body.email");
        expect(response1.body).toHaveProperty("errors.body.password");
    });
});
