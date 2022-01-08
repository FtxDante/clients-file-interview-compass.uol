/* eslint-disable require-jsdoc */
import {CitiesRepository} from '../repository/CitiesRepository';
import {CityRequest} from '../types/CityRequest';

export class CitiesService {
  async findAllCities(params: CityRequest) {
    const foundCities = await new CitiesRepository().findAll(params);
    return foundCities;
  }
};
