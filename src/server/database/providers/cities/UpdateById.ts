import { ETableNames } from '../../ETableNames';
import { ICity } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, city: Omit<ICity, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.city)
      .update(city)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Error updating registry');
  } catch (error) {
    console.log(error);
    return new Error('Error updating registry');
  }
};