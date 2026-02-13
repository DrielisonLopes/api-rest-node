import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { IUser } from "../../database/models";
import { validation } from "../../shared/middleware/Validation";
import { UsersProvider } from "../../database/providers/users";

interface IBodyProps extends Omit<IUser, "id"> {}

export const signUpValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            name: yup.string().required().min(3),
            password: yup.string().required().min(6),
            email: yup.string().required().email().min(5),
        }),
    ),
}));

export const signUp = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response,
) => {
    const result = await UsersProvider.Create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};
