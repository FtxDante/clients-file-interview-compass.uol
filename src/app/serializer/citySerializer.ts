import {City} from '../interfaces/City';
import {Paginate} from '../interfaces/Paginate';

export const serializer = ({id, city, state, createdAt}: City) => {
  return {id, city, state, createdAt};
};

export const serializePaginate = ({items, limit, offset, offsets, total}: Paginate) => {
  return {
    cities: items.map(serializer),
    total,
    limit,
    offset,
    offsets,
  };
};
