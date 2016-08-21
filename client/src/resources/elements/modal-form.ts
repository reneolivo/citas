import {autoinject, bindable, child} from 'aurelia-framework';
import {Modal} from './modal';
import validateForm from '../../services/helpers/validate-form';
import Toast from '../../services/helpers/toast';

@autoinject
export class ModalForm {
  @bindable public successMessage: string;
  @bindable public errorMessage: string;
  @bindable public formErrorMessage: string;

  @bindable public formControl: any;

  protected defaultSuccessMessage: string = 'Formulario guardado correctamente.';
  protected defaultErrorMessage: string = 'Hubo un error. Intente de nuevo.';
  protected defaultFormErrorMessage: string = 'Por favor, complete los datos del formulario correctamente';

  @child('modal') private modal: Modal;
  @child('form') private formElement;

  constructor(
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
    this.formElement.reset();

    if (this.formControl) {
      this.formControl.reset();
    }
  }

  submit() {
    if (!validateForm(this.formElement)) {
      const formErrorMessage =
        this.formErrorMessage ||
        this.defaultFormErrorMessage;

      this.toast.warning(`
        <i class="fa-left fa-exclamation"></i>
        ${this.defaultFormErrorMessage}
      `);

      return;
    }

    if (!this.formControl) return;

    this.formControl.submit()
    .then(
      () => this.submitSuccess(),
      () => this.submitError()
    );
  }

  protected submitSuccess() {
    const successMessage = this.successMessage || this.defaultSuccessMessage;

    this.toast.success(`
      <i class="fa-left fa-floppy-o"></i>
      ${successMessage}
    `, 10000);
    this.close();
  }

  protected submitError() {
    const errorMessage = this.errorMessage || this.defaultErrorMessage;

    this.toast.error(`
      <i class="fa-left fa-exclamation-triangle"></i>
      ${errorMessage}
    `, 10000);
  }
}
