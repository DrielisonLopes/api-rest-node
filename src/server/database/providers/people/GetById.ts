import { ETableNames } from "../../ETableNames";
import { IPerson } from "../../models";
import { Knex } from "../../knex";

export const getById = async (id: number): Promise<IPerson | Error> => {
    try {
        const result = await Knex(ETableNames.person)
            .select("*")
            .where("id", "=", id)
            .first();

        if (result) return result;

        return new Error("Record not found");
    } catch (error) {
        console.log(error);
        return new Error("Error when querying records");
    }
};
