import {Request, Response} from 'express';
import {serializePaginate, serializer} from '../serializer/clientsSerializer';
import ClientsService from '../services/ClientsService';

export default class ClientsController {
  static async postAClient(req: Request, res: Response) {
    try {
      const {body} = req;
      const result = await ClientsService.create(body);
      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(err.statusCode).json({message: err.message});
    }
  }

  static async getAllClients(req: Request, res: Response) {
    const {limit = 10, page = 1, ...queries} = req.query;
    const result = await ClientsService.getAll({limit, page, ...queries});
    return res.status(200).json(serializePaginate(result));
  }

  static async findOneClient(req: Request, res: Response) {
    try {
      const query = req.query;
      const result = await ClientsService.findOne(query);
      return res.status(200).json(serializer(result));
    } catch (err: any) {
      return res.status(err.statusCode).json({message: err.message});
    }
  }

  static async updateAClient(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const {body} = req;
      const result = await ClientsService.updateOne(id, body);
      return res.status(200).send(serializer(result));
    } catch (err: any) {
      return res.status(err.statusCode).json({message: err.message});
    }
  }


  static async deleteClient(req: Request, res: Response) {
    try {
      const {id} = req.params;
      await ClientsService.delete(id);
      res.status(204).end();
    } catch (err: any) {
      return res.status(err.statusCode).json({message: err.message});
    }
  }
}
