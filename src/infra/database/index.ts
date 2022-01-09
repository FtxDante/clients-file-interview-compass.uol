import {createConnection} from 'typeorm';
class Connection {
  constructor() {
    this.connect();
  }
  async connect() {
    console.log('Connectando');
    await createConnection();
    console.log('Conectado');
  }
}

export default new Connection();
