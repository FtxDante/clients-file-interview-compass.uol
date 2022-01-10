import ClientsRepository from '../Repository/ClientsRepository';
import Service from './Service';

export default new class ClientsService extends Service {
  constructor() {
    super(ClientsRepository);
  }

  async findOne({id, name}) {
    const where = {id, name};
    if (!where.id) delete where.id;
    if (!where.name) delete where.name;
    return await super.findOne(where);
  }

  async updateOne(id: any, {name}): Promise<unknown> {
    return await super.updateOne(id, {name});
  }
};
