/* eslint-disable new-cap */
import {Application, Router} from 'express';
import citiesRoute from './citiesRoute';
import clientsRoute from './clientsRoute';

export default (server: Application) => {
  server.use((req, res, next) => {
    citiesRoute(server, Router());
    clientsRoute(server, Router());
    next();
  });
};
