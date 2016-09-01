import {autoinject} from 'aurelia-framework';
import {Professionals} from '../services/api/professionals';
import Toast from '../services/helpers/toast';

@autoinject
export class ProfessionalsIndex {
  public professionals = [];
  public selectedProfessionals = [];

  constructor(
    protected professionalsSrv: Professionals,
    protected toast: Toast
  ) {}

  created() {
    this.loadProfessionals();
  }

  loadProfessionals() {
    this.professionalsSrv.getAll()
    .then((results) => this.professionals = results);
  }

  deleteSelectedProfessionals() {
    let promises = this.selectedProfessionals.map((pro) => {
      return this.professionalsSrv.delete(pro.id);
    });

    Promise.all(promises)
    .then(() => this.displayDeleteSuccessMessage())
    .then(() => this.selectedProfessionals = [])
    .then(null, () => this.displayDeleteErrorMessage())
    .then(() => this.loadProfessionals());
  }

  displayDeleteSuccessMessage() {
    this.toast.success(`
      <i class="fa fa-check"></i>
      Doctores eliminados correctamente
    `);
  }

  displayDeleteErrorMessage() {
    this.toast.error(`
      <i class="fa fa-check"></i>
      Hubo un error procesando los datos
    `);
  }
}
