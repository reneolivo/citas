import {customElement, child} from 'aurelia-framework';

export class ProfessionalDialog {
  @child('modal') private modal;

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }
}
