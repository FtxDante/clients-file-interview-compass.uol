import express from 'express';
import 'reflect-metadata';
import './infra/database';
import routes from './routes';

const app = express();

app.use(express.json());
routes(app);

export {app};

