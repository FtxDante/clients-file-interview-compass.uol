import {createConnection} from 'typeorm';
import {createDatabase} from 'typeorm-extension';

export const connection = async () => {
  const connecionName = process.env.NODE_ENV == 'test'? 'test': 'default';
  await createDatabase({ifNotExist: true, characterSet: 'UTF8'});
  await createConnection(connecionName);
};
