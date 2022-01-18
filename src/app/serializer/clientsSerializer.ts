/* eslint-disable camelcase */
import {Client} from '../interfaces/Client';
import {Paginate} from '../interfaces/Paginate';
import moment from 'moment';

export const serializer = ({id, name, gender, birthdate,
  current_city_id, createdAt}: Client) => {
  return {
    id,
    name,
    age: new Date().getFullYear() - new Date(birthdate!).getFullYear(),
    gender,
    birthdate: moment(birthdate, 'YYYY MM DD hh:mm:ss').format('YYYY/MM/DD'),
    current_city_id,
    createdAt};
};

export const serializePaginate = ({items, limit, offset, offsets,
  total}: Paginate) => {
  return {
    clients: items.map(serializer),
    total,
    limit,
    offset,
    offsets,
  };
};
