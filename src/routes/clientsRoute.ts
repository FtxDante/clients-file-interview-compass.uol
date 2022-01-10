import {Application, Router} from 'express';
import ClientsController from '../app/controllers/ClientsController';

export default (server: Application, router: Router) => {
  router.post('/client', ClientsController.postAClient);
  router.get('/client/all?', ClientsController.getAllClients);
  router.get('/client', ClientsController.findOneClient);
  router.delete('/client/:id', ClientsController.deleteClient);
  router.put('/client/:id', ClientsController.updateAClient);
  server.use('/api/v1', router);
};
