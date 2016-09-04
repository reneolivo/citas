import {autoinject} from 'aurelia-framework';
import {ApiForm} from '../services/api/form/api-form';
import {Clients} from '../services/api/clients';
import {ClientModel} from '../services/api/models/client';

@autoinject
export class ClientForm extends ApiForm {
  constructor(clients: Clients) {
    super(clients, ClientModel);
  }
}
