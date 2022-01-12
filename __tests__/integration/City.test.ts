import request from 'supertest';
import app from '../../src/app';
import {connection} from '../../src/infra/database';
const city = {city: 'Manaus', state: 'CE'};

describe('Route cities', () => {
  beforeAll(async () => {
    await connection();
  });

  it('should create a city', async () => {
    jest.setTimeout(20000);
    const created = await request(app)
        .post('/api/v1/city')
        .send(city);
    const response = await request(app)
        .get('/api/v1/city?city=Manaus&state=CE');
    console.log(response.body, created.body);
    await request(app).delete(`/api/v1/city/${created.body.id}`);


    expect(created.status).toBe(201);
    expect(response.body).toEqual(created.body);
  });
  it('should return a city', async () => {
    const created = await request(app)
        .post('/api/v1/city')
        .send(city);
    const response = await request(app)
        .get(`/api/v1/city?city=${city.city}&state=${city.state}`);
    await request(app).delete(`/api/v1/city/${created.body.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(created.body);
  });
  it('should throw error Already Registered',async () => {
    await request(app)
        .post('/api/v1/city')
        .send(city);
    const created2 = await request(app)
        .post('/api/v1/city')
        .send(city);
    expect(created2.status).toBe(400);
    expect(created2.body).toEqual({message: 'Already Registered'})
  })
});
