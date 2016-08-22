import {autoinject} from 'aurelia-framework';
import Professionals from '../services/api/professionals';

@autoinject
export class ProfessionalsIndex {
  public professionals = [];

  constructor(
    protected professionalsSrv: Professionals
  ) {}

  created() {
    this.professionalsSrv.getAll()
    .then((results) => this.professionals = results);
  }
}
