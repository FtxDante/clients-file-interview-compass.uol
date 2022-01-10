import {City} from '../interfaces/City';
import {Client} from '../interfaces/Client';
import Repository from '../Repository/Repository';

export default class Service {
  constructor(private repository: Repository) {
  }
  async create(data: City | Client) {
    const itemAlreadyExists = await this.findOne(data);
    if (itemAlreadyExists) {
      throw new Error(`Already Registered`);
    }
    const create = await this.repository.create(data);
    return create;
  }

  async getAll(where: any) {
    const result = await this.repository.findAll(where);
    if (!result.length) throw new Error('Nothing to see here');
    return this.paginate(where, result);
  }

  async findOne(where: object) {
    const isEmptyWhere = Object.keys(where).length === 0;
    if (isEmptyWhere) throw new Error('Need a query');
    const result = await this.repository.findOne(where);
    return result;
  }

  async updateOne(id: string, data: any) {
    await this.findOne({id: id});
    if (data.id) delete data.id;
    const columnsFiltered = this.filterColumns(data);
    const result = await this.repository.update(id, data, columnsFiltered);
    return result;
  }

  async delete(id: string) {
    const idNotFound = !(await this.findOne({id: id}));
    if (idNotFound) throw new Error('Id not found');
    await this.repository.delete(id);
  }

  paginate({limit, page}: any, result: any) {
    const [items, total] = result;
    const offsets = Math.ceil(total/limit);
    const offset = parseInt(page);
    limit = parseInt(limit);
    return {
      items,
      total,
      limit,
      offset,
      offsets,
    };
  }

  filterColumns(data: City) {
    const columns = Object.keys(data);
    return columns.filter((column) => {
      if (column == 'id' || column == 'createdAt') {};
      return column;
    });
  }
};
