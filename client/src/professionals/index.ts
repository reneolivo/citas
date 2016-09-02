import {autoinject} from 'aurelia-framework';
import {Professionals} from '../services/api/professionals';

@autoinject
export class ProfessionalsIndex {
  constructor(
    protected professionals: Professionals
  ) {}
}
