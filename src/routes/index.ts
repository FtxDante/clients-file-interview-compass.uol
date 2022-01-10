/* eslint-disable new-cap */
import {Application, Router} from 'express';
import citiesRoute from './cities.routes';
import clientsRoute from './clients.routes';

export default (server: Application) => {
  server.use((req, res, next) => {
    citiesRoute(server, Router());
    clientsRoute(server, Router());
    next();
  });
};
