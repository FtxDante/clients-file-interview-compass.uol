import {EntityTarget, getConnection} from 'typeorm';
import {City} from '../interfaces/City';
import {Client} from '../interfaces/Client';
export default class Repository {
  constructor(private schema: EntityTarget<City | Client>) {
  }

  async create(data: City | Client) {
    const schema = getConnection(process.env.NODE_ENV).getRepository(this.schema);
    const result = schema.create(data);
    await schema.save(result);

    return result;
  }

  async findAllWithPagination({limit=10, page = 1, ...where}: any) {
    if (page >= 1) page--;
    const schema = getConnection(process.env.NODE_ENV).getRepository(this.schema);
    const filter = {where, skip: page * limit, take: limit};
    const filtered = await schema.findAndCount(filter);
    const result = this.paginate({limit, page}, filtered);
    return result;
  }

  async findOne(where: object) {
    const schema = getConnection(process.env.NODE_ENV).getRepository(this.schema);
    const result = await schema.findOne(where);

    return result;
  }

  async update(id:string, data: any): Promise<any> {
    const schema = getConnection(process.env.NODE_ENV).getRepository(this.schema);
    await schema.update(id, data);
    const update= await schema.findOne({id});
    return update;
  }

  async delete(id: string) {
    const schema = getConnection(process.env.NODE_ENV).getRepository(this.schema);
    await schema.delete(id);
  }

  paginate({limit, page}: any, result: any) {
    const [items, total] = result;
    const offsets = Math.ceil(total/limit);
    const offset = page + 1;
    return {
      items,
      total,
      limit,
      offset,
      offsets,
    };
  }
};
