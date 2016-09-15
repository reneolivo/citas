import {autoinject} from 'aurelia-framework';
import {ApiForm} from '../services/api/form/api-form';
import {Availabilities} from '../services/api/availabilities';
import {Professionals} from '../services/api/professionals';
import {AvailabilityTemplates} from '../services/api/availability-templates';
import {ProfessionalModel} from '../services/api/models/professional';
import {AvailabilityModel} from '../services/api/models/availability';

@autoinject
export class AvailabilityForm extends ApiForm<ProfessionalModel> {
  protected templates: AvailabilityModel[] = [];
  protected selectedAvailabilities: AvailabilityModel[] = [];

  constructor(
    protected professionals: Professionals,
    protected availabilitiesTemplates: AvailabilityTemplates
  ) {
    super(professionals, ProfessionalModel);

    this.getAllAvailabilityTemplates();
  }

  load(record: ProfessionalModel) {
    super.load(record);

    this.getProfessionalAvailability();
  }

  submit() {
    return this.professionals.setAvailabilities(
      this.record.id,
      this.selectedAvailabilities
    );
  }

  protected getAllAvailabilityTemplates() {
    return this.availabilitiesTemplates
    .getAll().then((templates) => this.templates = templates);
  }

  protected getProfessionalAvailability() {
    this.professionals.getAvailabilities(this.record.id)
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
