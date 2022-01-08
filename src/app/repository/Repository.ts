/* eslint-disable require-jsdoc */
import {CityRequest} from '../types/CityRequest';

export class Repository {
  constructor(private repository: any) {
    this.repository = repository;
  }

  async create(data: CityRequest) {
    const created = this.repository.create(data);
    await this.repository.save(created);
    return created;
  }

  async findAll(where: CityRequest | any = {}) {
    const found = await this.repository.find(where);
    return found;
  }
}
