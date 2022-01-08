import {Application, Router} from 'express';
import {CitiesRepository} from '../app/repository/CitiesRepository';

export default (server: Application, router: Router) => {
  router.get('/cities', async (req, res) => {
    const Repo = new CitiesRepository();
    const created = await Repo.findAll();
    res.send(created);
  });
  server.use('/api/v1', router);
};
