import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cities - UpdateById', () => {

  it('Update record', async () => {

    const res1 = await testServer
      .post('/cities')
      .send({ name: 'Rio de Janeiro' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdated = await testServer
      .put(`/cities/${res1.body}`)
      .send({ name: 'Rio' });

    expect(resUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Trying to update a record that doesn't exist", async () => {

    const res1 = await testServer
      .put('/cities/99999')
      .send({ name: 'Rio' });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});