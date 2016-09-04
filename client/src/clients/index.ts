import {autoinject} from 'aurelia-framework';
import {Clients} from '../services/api/clients';

@autoinject
export class ClientsIndex {
  constructor(
    protected clients: Clients
  ) {}
}
