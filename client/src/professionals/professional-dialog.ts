import {autoinject, child} from 'aurelia-framework';
import validateForm from '../services/helpers/validate-form';
import Professionals from '../services/api/professionals';
import Toast from '../services/helpers/toast';

@autoinject
export class ProfessionalDialog {
  protected professional: ProfessionalModel;
  @child('modal-form') private modal;

  constructor(
    protected element: Element,
    protected professionals: Professionals
  ) {}

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  reset() {
    this.professional = new ProfessionalModel();
  }

  submit() {
    return this.professionals.create(this.professional)
    .then((result) => {
      const submitSuccess = new CustomEvent('submit-success', {
        detail: result
      });
      this.element.dispatchEvent(submitSuccess);
      return result;
    });
  }
}

class ProfessionalModel {
  firstName: string;
  lastName: string;
  landLine: string;
  mobile: string;
  email: string;
  notes: string;
}
