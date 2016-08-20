import {autoinject, child} from 'aurelia-framework';
import validateForm from '../services/helpers/validate-form';
import Professionals from '../services/api/professionals';
import Toast from '../services/helpers/toast';

@autoinject
export class ProfessionalDialog {
  @child('modal') private modal;
  @child('form') private form;
  protected professional: ProfessionalModel;

  constructor(
    private professionals: Professionals,
    private toast: Toast
  ) {}

  open() {
    this.reset();
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  reset() {
    this.form.reset();

    this.professional = new ProfessionalModel();
  }

  submit() {
    if (!validateForm(this.form)) {
      this.toast.warning(`
        <i class="fa-left fa-exclamation"></i>
        Por favor, complete los datos del formulario correctamente
      `);

      return;
    }

    this.professionals.create(this.professional)
    .then(
      () => this.submitSuccess(),
      () => this.submitError()
    );
  }

  protected submitSuccess() {
    this.toast.success(`
      <i class="fa-left fa-floppy-o"></i>
      Doctor guardado correctamente
    `, 10000);
    this.close();
  }

  protected submitError() {
    this.toast.error(`
      <i class="fa-left fa-exclamation-triangle"></i>
      Hubo un error. Intente de nuevo.
    `, 10000);
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
