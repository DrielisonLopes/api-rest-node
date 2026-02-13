import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUser } from "../../models";

export const Create = async (
    user: Omit<IUser, "id">,
): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.user)
            .insert(user)
            .returning("id");

        if (typeof result === "object") {
            return result.id;
        } else if (typeof result === "number") {
            return result;
        }

        return new Error("Error creating user");
    } catch (error) {
        console.log(error);
        return new Error("Error creating user");
    }
};
