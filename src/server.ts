import app from './app';
import {connection} from './infra/database';
const port = process.env.ENV_PORT;
connection();

app.listen(port || 3000, () => {
  console.log(`The server is running at port ${port}`);
});

