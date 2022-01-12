import app from './app';
import {connection} from './infra/database';
const port = 3000;
connection();

app.listen(port, () => {
  console.log(`The server is running at port ${port}`);
});

