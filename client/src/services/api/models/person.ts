import {CoreApiModel} from './core-api-model';

export class Person extends CoreApiModel {
  firstName: string;
  lastName: string;
  landLine: string;
  mobile: string;
  email: string;
  notes: string;
}
