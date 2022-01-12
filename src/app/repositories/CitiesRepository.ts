import Repository from './Repository';
import {CitiesSchema} from '../schemas';

export default new class CitiesRepository extends Repository {
  constructor() {
    super(CitiesSchema);
  }
};
