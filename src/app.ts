import './infra/database';
import express from 'express';
import 'reflect-metadata';
import routes from './routes';
import {pagination} from 'typeorm-pagination';

const app = express();

app.use(express.json());
app.use(pagination);
routes(app);

export default app;

