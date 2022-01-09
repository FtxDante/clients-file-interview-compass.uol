import {getRepository} from 'typeorm';

export default class Repository {
  constructor(private schema) {
  }
  async create(data: object) {
    const repo = getRepository(this.schema);
    const result = repo.create(data);
    await repo.save(result);
    return result;
  }

  async findAll({take = 10, skip = 0, ...queries}) {
    console.log(take, skip, queries);
    const repo = getRepository(this.schema);
    const result = await repo.findAndCount({
      where: queries, skip: skip, take: take});
    return result;
  }

  async findOne(where: object) {
    const repo = getRepository(this.schema);
    const result = await repo.findOne(where);
    return result;
  }

  async update(id:string, data, columns: string[]) {
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
