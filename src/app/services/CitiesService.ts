import {BadRequest, NotFound} from '../errors';
import {City} from '../interfaces/City';
import {Client} from '../interfaces/Client';
import CitiesRepository from '../repositories/CitiesRepository';

export default new class CitiesService {
  private repository;
  constructor() {
    this.repository = CitiesRepository;
  }

  async findOne(where: City) {
    if (!where.city) delete where.city;
    if (!where.state) delete where.state;
    const result = await this.repository.findOne(where);
    if (!result) throw new NotFound(`City`);
    return result;
  }

  async create(data: City) {
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

  async alreadyRegistered(where: City | Client): Promise<void> {
    const AlreadyRegistered = await this.repository.findOne(where);
    if (AlreadyRegistered) throw new BadRequest('Already Registered');
  }
};
