import ClientsRepository from '../Repository/ClientsRepository';
import Service from './Service';

export default new class ClientsService extends Service {
  constructor() {
    super(ClientsRepository);
  }
};
