import {createConnection} from 'typeorm';
export const connection = async () => {
  await createConnection(process.env.NODE_ENV!);
};
