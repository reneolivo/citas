import {customElement, child} from 'aurelia-framework';

export class ProfessionalDialog {
  @child('modal') private modal;

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  submit(form) {
    const submitAttempt = new Event('submitAttempt');
    form.dispatchEvent(submitAttempt);
    if (!form.checkValidity()) return;
    console.log('YES!')
  }
}
