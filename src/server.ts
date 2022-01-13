import app from './app';
import {connection} from './infra/database';
connection();
const port = 3000;

app.listen(port, () => {
  console.log(`The server is running at port ${port}`);
});
