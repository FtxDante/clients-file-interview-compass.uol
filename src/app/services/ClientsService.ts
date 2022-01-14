import {BadRequest, NotFound} from '../errors';
import {Client} from '../interfaces/Client';
import ClientsRepository from '../repositories/ClientsRepository';

export default new class ClientsService {
  private repository;
  constructor() {
    this.repository = ClientsRepository;
  }

  async findOne(where: Client): Promise<Client> {
    if (!where.id) delete where.id;
    if (!where.name) delete where.name;
    const result = await this.repository.findOne(where);
    if (!result) throw new NotFound(`Client`);
    return result;
  }

  async updateOne(id: any, {name}: Client): Promise<Client> {
    await this.findOne({id});
    const result = await this.repository.update(id, {name});
    return result;
  }

  async create(data: Client) {
    await this.alreadyRegistered(data);
    const create = await this.repository.create(data);
    return create;
  }

  async getAll(where: any) {
    const result = await this.repository.findAllWithPagination(where);
    return result;
  }

  async delete(id: string): Promise<void> {
    await this.findOne({id});
    await this.repository.delete(id);
  }

  async alreadyRegistered(where: Client): Promise<void> {
    const AlreadyRegistered = await this.repository.findOne(where);
    if (AlreadyRegistered) throw new BadRequest('Already Registered');
  }
};
