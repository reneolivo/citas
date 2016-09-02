import {autoinject, child} from 'aurelia-framework';
import validateForm from '../services/helpers/validate-form';
import {Professionals} from '../services/api/professionals';
import Toast from '../services/helpers/toast';

@autoinject
export class ProfessionalForm {
  protected professional: ProfessionalModel;
  @child('form') protected modal;

  constructor(
    protected professionals: Professionals
  ) {
    this.reset();
  }

  load(data: any) {
    this.professional = new ProfessionalModel(data);
  }

  reset() {
    this.professional = new ProfessionalModel();
  }

  submit() {
    if (this.professional.id) {
      return this.professionals.update(
        this.professional.id,
        this.professional
      );
    } else {
      return this.professionals.create(
        this.professional
      );
    }
  }
}

export class ProfessionalModel {
  id: number;
  firstName: string;
  lastName: string;
  landLine: string;
  mobile: string;
  email: string;
  notes: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}
