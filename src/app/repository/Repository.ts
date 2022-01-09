import {getRepository} from 'typeorm';

export default class Repository {
  constructor(private schema) {
  }

  async create(data: object) {
    const schema = getRepository(this.schema);
    const result = schema.create(data);
    await schema.save(result);

    return result;
  }

  async findAll({limit, page, ...where}) {
    if (page >= 1) page--;
    const schema = getRepository(this.schema);
    const filter = {where, skip: page * limit, take: limit};
    const result = await schema.findAndCount(filter);

    return result;
  }

  async findOne(where: object) {
    const schema = getRepository(this.schema);
    const result = await schema.findOne(where);

    return result;
  }

  async update(id:string, data, columns: string[]) {
    const schema = getRepository(this.schema);
    const result = await schema.findOne(id);

    columns.forEach((column) => {
      result[column] = data[column] ? data[column] : result[column];
    });

    return await schema.save(result);
  }

  async delete(id: string) {
    const schema = getRepository(this.schema);
    await schema.delete(id);
  }
};
