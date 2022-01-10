import {BaseError} from './BaseError';
import {httpStatusCode} from './httpStatusCode';

export class AlreadyRegisteredError extends BaseError {
  constructor(message: string = 'Already Registered') {
    super('AlreadyRegistered', httpStatusCode.BAD_REQUEST, message);
  }
};
