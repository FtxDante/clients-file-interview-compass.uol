import Repository from './Repository';
import {PeopleSchema} from '../schemas';

export default new class CitiesRepository extends Repository {
  constructor() {
    super(PeopleSchema);
  }
};
