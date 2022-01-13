import request from 'supertest';
import { getConnection } from 'typeorm';
import app from '../../src/app';
import {connection} from '../../src/infra/database';
beforeAll(async () => {
  await connection();
});
afterEach(async () => {
  const data = getConnection().entityMetadatas;
  let repo;
  data.forEach(async (entity) => {
    repo = getConnection().getRepository(entity.name);
    await repo.delete({});
  });
});

afterAll(async () => {
  getConnection().close();
});

describe('Route cities', () => {
  const city = {city: 'Manaus', state: 'CE'};
  it('should create a city', async () => {
    const created = await request(app).post('/api/v1/city').send(city);
    const response = await request(app).get('/api/v1/city?city=Manaus&state=CE');
    expect(created.status).toBe(201);
    expect(response.body).toEqual(created.body);
  });
});
