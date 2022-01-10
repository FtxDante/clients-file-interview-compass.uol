import {BaseError} from './BaseError';
import {httpStatusCode} from './httpStatusCode';

export class NotGivenQuery extends BaseError {
  constructor(message: string = 'Queries was not found') {
    super('NotGivenQuery', httpStatusCode.BAD_REQUEST, message);
  }
};
