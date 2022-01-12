import {NextFunction, Request, Response} from 'express';
import Joi from 'joi';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      id: Joi.string()
          .uuid(),
      name: Joi.string()
          .trim(),
    }).or('id', 'name');
    const {query} = req;
    const {error} = schema.validate(query, {abortEarly: false});
    if (error) throw error;
    next();
  } catch (err: any) {
    res.status(400).json({message: err.message});
  }
};
