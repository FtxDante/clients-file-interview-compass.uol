import {EntityTarget, getRepository} from 'typeorm';
import {City} from '../interfaces/City';
import {Client} from '../interfaces/Client';

export default class Repository {
  constructor(private schema: EntityTarget<City | Client>) {
  }

  async create(data: City | Client) {
    const schema = getRepository(this.schema);
    const result = schema.create(data);
    await schema.save(result);

    return result;
  }

  async findAll({limit, page, ...where}: any) {
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

  async update(id:string, data: any, columns: string[]) {
    const schema = getRepository(this.schema);
    const result: any = await schema.findOne(id);

    columns.forEach((column: string) => {
      result[column] = data[column] ? data[column] : result[column];
    });

    return await schema.save(result);
  }

  async delete(id: string) {
    const schema = getRepository(this.schema);
    await schema.delete(id);
  }
};
