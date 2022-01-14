import {BaseError} from './BaseError';
import {httpStatusCode} from './httpStatusCode';

export class NotFound extends BaseError {
  constructor(description: string) {
    super('NotFound', httpStatusCode.NOT_FOUND,
        `${description} was not found`);
  }
}
