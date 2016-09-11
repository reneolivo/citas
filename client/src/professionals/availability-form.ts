import {autoinject} from 'aurelia-framework';
import {ApiForm} from '../services/api/form/api-form';
import {Availabilities} from '../services/api/availabilities';
import {AvailabilityTemplates} from '../services/api/availability-templates';
import {ProfessionalModel} from '../services/api/models/professional';
import {AvailabilityModel} from '../services/api/models/availability';

@autoinject
export class AvailabilityForm extends ApiForm<ProfessionalModel> {
  protected templates: AvailabilityModel[] = [];

  constructor(
    protected availabilities: Availabilities,
    protected availabilitiesTemplates: AvailabilityTemplates
  ) {
    super(availabilities, ProfessionalModel);

    this.getAllAvailabilityTemplates();
  }

  protected getAllAvailabilityTemplates() {
    this.availabilitiesTemplates
    .getAll().then((templates) => this.templates = templates);
  }
}
