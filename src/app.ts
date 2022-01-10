import './infra/database';
import express from 'express';
import 'reflect-metadata';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../swagger.json';

const app = express();

app.use(express.json());
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
routes(app);

export default app;

