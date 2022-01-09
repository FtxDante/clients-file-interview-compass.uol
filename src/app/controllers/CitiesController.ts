import {Request, Response} from 'express';
import CitiesService from '../services/CitiesService';

export default class CitiesController {
  static async getAllCities(req: Request, res: Response) {
    try {
      const {query} = req;
      const result = await CitiesService.getAll(query);
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
      const {query} = req;
      const result = await CitiesService.findOne(query);
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
