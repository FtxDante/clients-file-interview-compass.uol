import Repository from '../Repository/Repository';

export default class Service {
  constructor(private repository: Repository) {
  }
  async getAll(where) {
    const result = await this.repository.findAll(where);
    if (!result.length) throw new Error('Nothing to see here');
    return result;
  }

  async create(data) {
    const itemAlreadyExists = await this.findOne(data);
    if (itemAlreadyExists) {
      throw new Error(`Already Registered`);
    }
    const create = await this.repository.create(data);
    return create;
  }

  async findOne(where) {
    const isEmptyWhere = Object.keys(where).length === 0;
    if (isEmptyWhere) throw new Error('Need a query');
    const result = await this.repository.findOne(where);
    if (!result) throw new Error('Nothing Found');
    return result;
  }

  async updateOne(id, data) {
    await this.findOne(id);
    const columnsFiltered = this.filterColumns(data);
    const result = await this.repository.update(id, data, columnsFiltered);
    return result;
  }

  async delete(id) {
    const idNotFound = !(await this.findOne({id: id}));
    if (idNotFound) throw new Error('Id not found');
    await this.repository.delete(id);
  }

  filterColumns(data) {
    const columns = Object.keys(data);
    return columns.filter((column) => {
      if (column == 'id' || column == 'createdAt') {};
      return column;
    });
  }
};
