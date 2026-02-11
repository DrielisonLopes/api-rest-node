import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware/Validation";
import { PeopleProvider } from "../../database/providers/people";

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}
export const getAllValidation = validation((getSchema) => ({
    query: getSchema(
        yup.object({
            filter: yup.string().notRequired(),

            page: yup
                .number()
                .transform((_, value) =>
                    value !== undefined ? Number(value) : undefined,
                )
                .notRequired()
                .min(1, "Page must be greater than 0")
                .typeError("Page must be a number"),

            limit: yup
                .number()
                .transform((_, value) =>
                    value !== undefined ? Number(value) : undefined,
                )
                .notRequired()
                .min(1, "Limit must be greater than 0")
                .typeError("Limit must be a number"),
        }),
    ),
}));

export const getAll = async (
    req: Request<{}, {}, {}, IQueryProps>,
    res: Response,
) => {
    const result = await PeopleProvider.getAll(
        req.query.page || 1,
        req.query.limit || 7,
        req.query.filter || "",
    );
    const count = await PeopleProvider.count(req.query.filter || "");

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message },
        });
    } else if (count instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: count.message },
        });
    }

    res.setHeader("access-control-expose-headers", "x-total-count");
    res.setHeader("x-total-count", count);

    return res.status(StatusCodes.OK).json(result);
};
