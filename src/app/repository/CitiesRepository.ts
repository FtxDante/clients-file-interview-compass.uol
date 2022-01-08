/* eslint-disable require-jsdoc */
import {getRepository} from 'typeorm';
import {CitiesSchema} from '../schemas';
import {Repository} from './Repository';

export class CitiesRepository extends Repository {
  Cities: any;
  constructor() {
    super(getRepository(CitiesSchema));
  }
}
