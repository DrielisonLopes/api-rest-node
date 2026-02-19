import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Users - SignUp", () => {
    it("Register user 1", async () => {
        const response1 = await testServer.post("/register").send({
            name: "Test User",
            password: "123456",
            email: "testuser@example.com",
        });
        expect(response1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof response1.body).toBe("number");
    });
    it("Register user 2", async () => {
        const response1 = await testServer.post("/register").send({
            name: "Test User 2",
            password: "123456",
            email: "testuser2@example.com",
        });
        expect(response1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof response1.body).toBe("number");
    });
    it("should fail with existing email", async () => {
        const response1 = await testServer.post("/register").send({
            name: "Test User",
            password: "123456",
            email: "testuserduplicated@example.com",
        });
        expect(response1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof response1.body).toBe("number");
        const response2 = await testServer.post("/register").send({
            name: "Test New User",
            password: "123456",
            email: "testuserduplicated@example.com",
        });
        expect(response2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(response2.body).toHaveProperty("errors.default");
    });
    it("Error to register without email", async () => {
        const res1 = await testServer.post("/register").send({
            password: "123456",
            name: "Juca da Silva",
            // email: "testuser@example.com",
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.email");
    });
    it("Error to register without name", async () => {
        const res1 = await testServer.post("/register").send({
            password: "123456",
            // name: 'Juca da Silva',
            email: "jucasilva@gmail.com",
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.name");
    });
    it("Error to register without password", async () => {
        const res1 = await testServer.post("/register").send({
            // password: '123456',
            name: "Juca da Silva",
            email: "jucasilva@gmail.com",
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.password");
    });
    it("Error to register with invalid email", async () => {
        const res1 = await testServer.post("/register").send({
            password: "123456",
            name: "Juca da Silva",
            email: "jucasilva gmail.com",
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.email");
    });
    it("Error to register with too short password", async () => {
        const res1 = await testServer.post("/register").send({
            password: "123",
            name: "Juca da Silva",
            email: "jucasilva@gmail.com",
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.password");
    });
    it("Error to register with too short name", async () => {
        const res1 = await testServer.post("/register").send({
            password: "123456",
            name: "Ju",
            email: "jucasilva@gmail.com",
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.name");
    });
});
