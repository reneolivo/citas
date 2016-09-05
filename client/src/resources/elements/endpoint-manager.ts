import {autoinject, bindable, child, children} from 'aurelia-framework';
import {CoreApiService} from '../../services/api/core-api-service';
import {ApiForm} from '../../services/api/form/api-form';
import {CoreApiModel} from '../../services/api/models/core-api-model';
import Toast from '../../services/helpers/toast';
import {Column} from './column';

@autoinject
export class EndpointManager {
  records: any[] = [];
  selectedRecords: any[] = [];

  @children('column') columns: Column[];
  @bindable apiService: CoreApiService;

  @child('[slot=form]') formControl: ApiForm<CoreApiModel>;
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
