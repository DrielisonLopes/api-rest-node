import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUser } from "../../models";

export const GetByEmail = async (email: string): Promise<IUser | Error> => {
    try {
        const result = await Knex(ETableNames.user)
            .select("*")
            .where("email", "=", email)
            .first();

        if (result) return result;

        return new Error("User not found");
    } catch (error) {
        console.log(error);
        return new Error("Error getting user by email");
    }
};
