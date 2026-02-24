import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { UsersProvider } from "../../database/providers/users";
import { validation } from "../../shared/middleware/Validation";
import { IUser } from "../../database/models";
import { PasswordCrypto } from "../../shared/middleware/PasswordCrypto";

interface IBodyProps extends Omit<IUser, "id" | "name"> {}
export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            email: yup.string().required().email().min(5),
            password: yup.string().required().min(6),
        }),
    ),
}));

export const signIn = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response,
) => {
    const { email, password } = req.body;

    const result = await UsersProvider.GetByEmail(email);
    if (result instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Email or password are invalid",
            },
        });
    }

    const passwordMatch = await PasswordCrypto.verifyPassword(
        password,
        result.password,
    );
    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Email or password are invalid",
            },
        });
    } else {
        return res
            .status(StatusCodes.OK)
            .json({ accessToken: "teste.teste.teste" });
    }
};
