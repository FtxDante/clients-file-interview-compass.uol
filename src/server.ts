import app from './app';
const port: number = parseInt(process.env.PORT!);

app.listen(port | 3000, () => {
  console.log(`The server is running at port ${port}`);
});
