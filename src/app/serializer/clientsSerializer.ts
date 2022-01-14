/* eslint-disable camelcase */
import {Client} from '../interfaces/Client';
import {Paginate} from '../interfaces/Paginate';
import moment from 'moment';

export const serializer = ({id, name, age, gender, birthdate, current_city_id, createdAt}: Client) => {
  return {id, name, age, gender, birthdate: moment(birthdate, 'DD MM YYYY hh:mm:ss').format('YYYY/MM/DD'), current_city_id, createdAt};
};

export const serializePaginate = ({items, limit, offset, offsets, total}: Paginate) => {
  return {
    clients: items.map(serializer),
    total,
    limit,
    offset,
    offsets,
  };
};
