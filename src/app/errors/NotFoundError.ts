import {BaseError} from './BaseError';
import {httpStatusCode} from './httpStatusCode';

export class NotFoundError extends BaseError {
  constructor(message: string = 'Not Found') {
    super('NotFound', httpStatusCode.NOT_FOUND, message);
  }
}
