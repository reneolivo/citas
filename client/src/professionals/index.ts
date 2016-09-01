import {autoinject} from 'aurelia-framework';
import {Professionals} from '../services/api/professionals';
import Toast from '../services/helpers/toast';

@autoinject
export class ProfessionalsIndex {
  constructor(
    protected professionals: Professionals
  ) {}
}
