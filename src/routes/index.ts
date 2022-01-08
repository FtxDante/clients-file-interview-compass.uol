/* eslint-disable new-cap */
import {Application, Router} from 'express';
import citiesRoute from './CitiesRoute';
export default (server: Application) => {
  server.use((req, res, next) => {
    citiesRoute(server, Router());
    next();
  });
};
