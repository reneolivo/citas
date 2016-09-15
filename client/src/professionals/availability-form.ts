import {autoinject} from 'aurelia-framework';
import {ApiForm} from '../services/api/form/api-form';
import {Availabilities} from '../services/api/availabilities';
import {AvailabilityTemplates} from '../services/api/availability-templates';
import {ProfessionalModel} from '../services/api/models/professional';
import {AvailabilityModel} from '../services/api/models/availability';

@autoinject
export class AvailabilityForm extends ApiForm<ProfessionalModel> {
  protected templates: AvailabilityModel[] = [];
  protected selectedAvailabilities: AvailabilityModel[] = [];

  constructor(
    protected availabilities: Availabilities,
    protected availabilitiesTemplates: AvailabilityTemplates
  ) {
    super(availabilities, ProfessionalModel);

    this.getAllAvailabilityTemplates();
  }

  load(record: ProfessionalModel) {
    super.load(record);

    this.getProfessionalAvailability();
  }

  protected getAllAvailabilityTemplates() {
    return this.availabilitiesTemplates
    .getAll().then((templates) => this.templates = templates);
  }

  protected getProfessionalAvailability() {
    this.availabilities.getAll({ professionalId: this.record.id })
    .then((result) => this.selectedAvailabilities = result);
  }

  protected availabilityMatcher(
    availabilityA: AvailabilityModel,
    availabilityB: AvailabilityModel
  ): boolean {
    return availabilityA && availabilityB
    && availabilityA.weekDay === availabilityB.weekDay
    && availabilityA.timeStarts === availabilityA.timeStarts
    && availabilityA.timeEnds === availabilityB.timeEnds;
  }
}
