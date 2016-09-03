import {autoinject, bindable, child} from 'aurelia-framework';
import {CoreApiService} from '../../services/api/core-api-service';
import Toast from '../../services/helpers/toast';

@autoinject
export class EndpointManager {
  records: any[] = [];
  selectedRecords: any[] = [];

  @bindable columns: Column = <Column>{};
  @bindable apiService: CoreApiService;
  @bindable formControl: any; // Todo: change to FormControl;

  @child('[slot=delete-success-message]') deleteSuccessMessage;
  @child('[slot=delete-error-message]') deleteErrorMessage;
  protected defaultDeleteSuccessMessage: string = 'Record deleted successfully';
  protected defaultDeleteErrorMessage: string = 'There was an error deleting the record';

  constructor(protected toast: Toast) {}

  apiServiceChanged() {
    this.getAllRecords();
  }

  getAllRecords() {
    this.apiService.getAll()
    .then((records) => this.records = records);
  }

  deleteSelectedRecords() {
    let promises = this.selectedRecords.map((record) => {
      return this.apiService.delete(record.id);
    });

    Promise.all(promises)
    .then(() => this.displayDeleteSuccessMessage())
    .then(() => this.selectedRecords = [])
    .then(null, () => this.displayDeleteErrorMessage())
    .then(() => this.getAllRecords());
  }

  displayDeleteSuccessMessage() {
    let message = this.deleteSuccessMessage
    && this.deleteSuccessMessage.innerText
    || this.defaultDeleteSuccessMessage;

    this.toast.success(`
      <i class="fa fa-check"></i>
      ${message}
    `);
  }

  displayDeleteErrorMessage() {
    let message = this.deleteErrorMessage
    && this.deleteErrorMessage.innerText
    || this.defaultDeleteErrorMessage;

    this.toast.error(`
      <i class="fa fa-check"></i>
      ${this.deleteErrorMessage}
    `);
  }
}

export interface Column {
  [header: string]: string;
}
