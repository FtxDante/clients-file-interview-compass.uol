import app from './app';

if (!process.env.PORT) process.env.PORT = '3000';
const port: number = parseInt(process.env.PORT);

app.listen(port, () => {
  console.log(`The server is running at port ${port}`);
});
