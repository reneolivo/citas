import {autoinject} from 'aurelia-framework';
import {ApiForm} from '../services/api/form/api-form';
import {Professionals} from '../services/api/professionals';
import {ProfessionalModel} from '../services/api/models/professional';

@autoinject
export class ProfessionalForm extends ApiForm<ProfessionalModel> {
  constructor(professionals: Professionals) {
    super(professionals, ProfessionalModel);
  }
}
