import CitiesRepository from '../Repository/CitiesRepository';
import Service from './Service';
export default new class CitiesService extends Service {
  constructor() {
    super(CitiesRepository);
  }
};
