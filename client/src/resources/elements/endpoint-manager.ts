import {autoinject, bindable} from 'aurelia-framework';
import {CoreApiService} from '../../services/api/core-api-service';
import Toast from '../../services/helpers/toast';

@autoinject
export class EndpointManager {
  records: any[] = [];
  selectedRecords: any[] = [];

  @bindable title: string = null;
  @bindable addRecordLabel: string = 'Add Record';
  @bindable deleteRecordsLabel: string = 'Delete Records';
  @bindable deleteSuccessMessage: string = 'Record deleted successfully';
  @bindable deleteErrorMessage: string = 'There was an error deleting the record';

  @bindable columns: Column = <Column>{};
  @bindable apiService: CoreApiService;
  @bindable formControl: any; // Todo: change to FormControl;

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
    this.toast.success(`
      <i class="fa fa-check"></i>
      ${this.deleteSuccessMessage}
    `);
  }

  displayDeleteErrorMessage() {
    this.toast.error(`
      <i class="fa fa-check"></i>
      ${this.deleteErrorMessage}
    `);
  }
}

export interface Column {
  [header: string]: string;
}
