import {BaseError} from './BaseError';
import {httpStatusCode} from './httpStatusCode';

export class BadRequest extends BaseError {
  constructor(description: string) {
    super('Bad Request', httpStatusCode.BAD_REQUEST, description);
  }
};
