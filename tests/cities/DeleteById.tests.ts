import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cities  - DeleteById', () => {

    it('Delete record', async () => {
  
      const res1 = await testServer
        .post('/cities')
        .send({ name: 'Rio de Janeiro' });
  
      expect(res1.statusCode).toEqual(StatusCodes.CREATED);
  
      const resDelete = await testServer
        .delete(`/cities/${res1.body}`)
        .send();
  
      expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it("Try to delete a record that doesn't exist", async () => {
  
      const res1 = await testServer
        .delete('/cities/99999')
        .send();
  
      expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(res1.body).toHaveProperty('errors.default');
    });
  });
