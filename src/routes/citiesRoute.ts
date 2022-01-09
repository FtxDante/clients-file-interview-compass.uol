import {Application, Router} from 'express';
import CitiesController from '../app/controllers/CitiesController';

export default (server: Application, router: Router) => {
  router.post('/city', CitiesController.postACity);
  router.get('/city/all?', CitiesController.getAllCities);
  router.get('/city/?', CitiesController.findCity);
  router.delete('/city/:id', CitiesController.deleteCity);
  router.put('/city/:id', CitiesController.updateACity);
  server.use('/REST', router);
};
