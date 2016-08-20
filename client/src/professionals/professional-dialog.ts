import {customElement, child} from 'aurelia-framework';
import validateForm from '../services/helpers/validate-form';

export class ProfessionalDialog {
  @child('modal') private modal;
  @child('form') private form;

  open() {
    this.form.reset();
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  submit(form) {
    if (!validateForm(form)) return;

    console.log('YES!');
  }
}
