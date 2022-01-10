import {Request, Response} from 'express';
import CitiesService from '../services/CitiesService';

export default class CitiesController {
  static async getAllCities(req: Request, res: Response) {
    try {
      const {limit = 10, page = 1, ...queries} = req.query;
      const result = await CitiesService.getAll({limit, page, ...queries});
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({message: err.message});
    }
  }

  static async postACity(req: Request, res: Response) {
    try {
      const {body} = req;
      const result = await CitiesService.create(body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({message: err.message});
    }
  }

  static async findCity(req: Request, res: Response) {
    try {
      const {city, state} = req.query;
      const result = await CitiesService.findOne({city, state});
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({message: err.message});
    }
  }

  static async deleteCity(req: Request, res: Response) {
    try {
      const {id} = req.params;
      await CitiesService.delete(id);
      res.status(200).end();
    } catch (err) {
      res.status(400).json({message: err.message});
    }
  }
}
