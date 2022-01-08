import {app} from './app';

const port = process.env.ENV_PORT;

app.listen(3000, () => {
  console.log(`The server is running at port ${port}`);
});

