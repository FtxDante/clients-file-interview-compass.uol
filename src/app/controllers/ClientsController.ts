import {Request, Response} from 'express';
import ClientsService from '../services/ClientsService';

export default class ClientsController {
  static async postAClient(req: Request, res: Response) {
    try {
      const {body} = req;
      const result = await ClientsService.create(body);
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(400).json({message: err.message});
    }
  }

  static async getAllClients(req: Request, res: Response) {
    try {
      const {limit = 10, page = 1, ...queries} = req.query;
      const result = await ClientsService.getAll({limit, page, ...queries});
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({message: err.message});
    }
  }

  static async findOneClient(req: Request, res: Response) {
    try {
      const {id, name} = req.query;
      const result = await ClientsService.findOne({id, name});
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({message: err.message});
    }
  }

  static async updateAClient(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const {body} = req;
      const result = await ClientsService.updateOne(id, body);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).json({message: err.message});
    }
  }


  static async deleteClient(req: Request, res: Response) {
    try {
      const {id} = req.params;
      await ClientsService.delete(id);
      res.status(200).end();
    } catch (err) {
      res.status(400).json({message: err.message});
    }
  }
}
