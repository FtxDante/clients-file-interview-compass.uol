import request, {Response} from 'supertest';
import { getConnection } from 'typeorm';
import app from '../../src/app';
import { connection } from '../../src/infra/database';

beforeAll(async () => {
  await connection();
});

afterAll(async () => {
  const entities = getConnection(process.env.NODE_ENV).entityMetadatas;
  for (const entity of entities) {
    const repository = await getConnection(process.env.NODE_ENV).getRepository(entity.name);
    await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
  }
})

describe('Route cities', () => {
  const city = {city: 'Manaus', state: 'ZZ'};
  let created: Response;
  it('should create a city with status 2021', async () => {
    created = await request(app).post('/api/v1/city').send(city);
    const {body, status} = await request(app).get('/api/v1/city?city=Manaus&state=ZZ');
    expect(created.status).toBe(201);
    expect(status).toBe(200);

    expect(body.id).toEqual(created.body.id);
    expect(body.city).toEqual(created.body.city);
    expect(body.state).toEqual(created.body.state);
  });

  it('should throw error "Already Registered" ', async () => {
    const {body, status} = await request(app).post('/api/v1/city').send(city);
    expect(status).toBe(400);
    expect(body).toHaveProperty('message');
    expect(body).toEqual({message: "Already Registered"});
  });

  it('should throw error when send data without min length to post with status 400', async () => {
    const {body, status} = await request(app).post('/api/v1/city').send({city: 'a', state: 'a'})
    expect(status).toBe(400);
    expect(body).toHaveProperty('message');
    expect(body).toEqual({message: "\"city\" length must be at least 5 characters long. \"state\" length must be at least 2 characters long"});
  });

  it('should return all cities with pagination and status 200', async () => {
    const {status, body} = await request(app).get('/api/v1/city/all').send(city);
    expect(status).toBe(200);
    expect(body).toHaveProperty('cities');
    expect(body).toHaveProperty('total');
    expect(body).toHaveProperty('limit');
    expect(body).toHaveProperty('offset');
    expect(body).toHaveProperty('offsets');
    expect(body.cities[0].city).toEqual(created.body.city);
    expect(body.cities[0].state).toEqual(created.body.state);
    expect(body.cities[0].id).toEqual(created.body.id);
  });

  it('should return city researched by query params with status 200', async () => {
    const {body, status} = await request(app).get('/api/v1/city?city=Manaus&state=ZZ');
    expect(status).toBe(200);
    expect(body.city).toEqual(created.body.city);
    expect(body.state).toEqual(created.body.state);
  });

  it('should return a error city and state required with status 400', async () => {
    const {body, status} = await request(app).get('/api/v1/city');
    expect(status).toBe(400);
    expect(body).toHaveProperty('message');
    expect(body).toEqual({message: "\"city\" is required. \"state\" is required"});
  });

  it('should return a error "City was not found" with status 404', async () => {
    const {body, status} = await request(app).get('/api/v1/city?city=Manaus&state=KK');
    expect(status).toBe(404);
    expect(body).toHaveProperty('message');
    expect(body).toEqual({message: "City was not found"});
  });

  it('should delete a city with status 204', async () => {
    const {status} = await request(app).delete(`/api/v1/city/${created.body.id}`);
    expect(status).toBe(204);
  });

  it('should return error "City not Found" when try delete with status 404', async () => {
    const {body, status} = await request(app).delete(`/api/v1/city/08734680-49ae-42f8-abf6-c30ba2175380`);
    expect(status).toBe(404);
    expect(body).toHaveProperty('message');
    expect(body).toEqual({message: "City was not found"});
  });
});
