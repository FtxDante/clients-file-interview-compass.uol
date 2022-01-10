import {City} from '../interfaces/City';
import CitiesRepository from '../Repository/CitiesRepository';
import Service from './Service';
export default new class CitiesService extends Service {
  constructor() {
    super(CitiesRepository);
  }

  async findOne(where: City) {
    if (!where.city) delete where.city;
    if (!where.state) delete where.state;
    return await super.findOne(where);
  }
};
