import {Application, Router} from 'express';
import ClientsController from '../app/controllers/ClientsController';
import {allRequiredValidation,
  queriesRequiredValidation} from '../app/middlewares/validations/client';

export default (server: Application, router: Router) => {
  router.post('/client', allRequiredValidation, ClientsController.postAClient);
  router.get('/client/all', ClientsController.getAllClients);
  router.get('/client',
      queriesRequiredValidation, ClientsController.findOneClient);
  router.delete('/client/:id', ClientsController.deleteClient);
  router.patch('/client/:id', ClientsController.updateAClient);
  server.use('/api/v1', router);
};
