import {getRepository} from 'typeorm';

export default class Repository {
  constructor(private schema) {
  }
  async create(data) {
    const repo = getRepository(this.schema);
    const result = repo.create(data);
    await repo.save(result);
    return result;
  }

  async findAll(where) {
    const repo = getRepository(this.schema);
    const result = await repo.find({where});
    return result;
  }

  async findOne(where) {
    const repo = getRepository(this.schema);
    const result = await repo.findOne(where);
    return result;
  }

  async update(id, data, columns: string[]) {
    const repo = getRepository(this.schema);
    const update = await repo.findOne(id);
    columns.forEach((column) => {
      update[column] = data[column] ? data[column] : update[column];
    });
    return await repo.save(update);
  }

  async delete(id: string) {
    const repo = getRepository(this.schema);
    await repo.delete(id);
  }
};
