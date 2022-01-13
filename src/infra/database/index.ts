import {createConnection} from 'typeorm';
export const connection = async () => {
  const connecionName = process.env.NODE_ENV == 'test'? 'test': 'default';
  const connection = await createConnection(connecionName);
  console.log(connection.options.database);
};
