import request, { Response } from 'supertest';
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

describe('Tests in route of clients', () => {
  let client : object; 
  let created: Response;

  it('should create a client with status 201', async () => {
    const city = {city: 'Manaus', state: 'ZZ'};
    const cityCreated = await request(app).post('/api/v1/city').send(city);
    client = {
      name: "Johan Travoslta",
      gender: "others",
      birthdate: "2021/10/10",
      current_city_id: cityCreated.body.id
    }
    created = await request(app).post('/api/v1/client').send(client);

    expect(created.status).toBe(201);
    expect(created.body).toHaveProperty('id');
    expect(created.body).toHaveProperty('name');
    expect(created.body).toHaveProperty('gender');
    expect(created.body).toHaveProperty('birthdate');
    expect(created.body).toHaveProperty('current_city_id');
    expect(created.body).toHaveProperty('createdAt');
  });

  it('should return error "Already Registered" with status 400', async () => {
    const {body, status} = await request(app).post('/api/v1/client').send(client);
    expect(status).toBe(400);
    expect(body).toEqual({message: "Already Registered"});
  });

  it('should return erro "fields required" with status 400', async () => {
    const {body, status} = await request(app).post('/api/v1/client')
    expect(status).toBe(400);
    expect(body).toEqual({message: "\"name\" is required. \"gender\" is required. \"birthdate\" is required. \"current_city_id\" is required"});
  });

  it('should return client with status 200', async () => {
    const {body, status} = await request(app).get(`/api/v1/client?id=${created.body.id}`);
    expect(status).toBe(200);
    expect(body).toEqual(created.body);
  });

  it('should return error when no give the queries with status 400', async () => {
    const {body, status} = await request(app).get(`/api/v1/client`);
    expect(status).toBe(400);
    expect(body).toEqual({message: "\"value\" must contain at least one of [id, name]"})
  });

  it('should return error not found when give query "name" without registered client name with status 404', async () => {
    const {body, status} = await request(app).get(`/api/v1/client?name=Josue`);
    expect(status).toBe(404);
    expect(body).toEqual({message:  "Client was not found"})
  });

  it('should return error when not found with status 400', async () => {
    const {body, status} = await request(app).get(`/api/v1/client?id=d00ca95e-9fbf-4b5b-b949-ab168c52e562`);
    expect(status).toBe(404);
    expect(body).toEqual({message: "Client was not found"})
  });

  it('should return all clients with status 200', async () => {
    const {body, status} = await request(app).get(`/api/v1/client/all`);
    expect(status).toBe(200);
    expect(body).toHaveProperty('clients')
    expect(body).toHaveProperty('total')
    expect(body).toHaveProperty('limit')
    expect(body).toHaveProperty('offset')
    expect(body).toHaveProperty('offsets')
    expect(body.clients[0]).toEqual(created.body);
  });

  it('should update a client with status 200', async () => {
    const {body, status} = await request(app).patch(`/api/v1/client/${created.body.id}`).send({name: 'example'});
    expect(status).toBe(200);
    expect(body.name).toBe('example');
  });

  it('should return error when not found when try update with status 404', async () => {
    const {body, status} = await request(app).patch(`/api/v1/client/84d749f3-edfa-4e21-ba5b-459a9df11872`).send({name: 'example'});
    expect(status).toBe(404);
    expect(body).toEqual({message: "Client was not found"})
  });

  it('should return error when try update without name with status 400', async () => {
    const {body, status} = await request(app).patch(`/api/v1/client/${created.body.id}`);
    expect(status).toBe(400);
    expect(body).toEqual({message: "\"name\" is required"})
  });

  it('should delete one client with id 204', async () => {
    const {status} = await request(app).delete(`/api/v1/client/${created.body.id}`)
    expect(status).toBe(204);
  });

  it('should return error not found with id 404', async () => {
    const {body, status} = await request(app).delete(`/api/v1/client/84d749f3-edfa-4e21-ba5b-459a9df11872`)
    expect(status).toBe(404);
    expect(body).toEqual({message: "Client was not found"})
  });

  it('should return error id invalid with id 400', async () => {
    const {body, status} = await request(app).delete(`/api/v1/client/84d749f3-edfa-4e21-ba5b-459a9df1a1872`)
    expect(status).toBe(400);
    expect(body).toEqual({message:  "\"id\" must be a valid GUID"})
  });
  
});
