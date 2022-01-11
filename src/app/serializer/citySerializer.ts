import {City} from '../interfaces/City';

export const serializer = ({id, city, state, createdAt}: City) => {
  return {id, city, state, createdAt};
};
