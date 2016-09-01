import {bindable} from 'aurelia-framework';
import {CoreApiService} from '../../services/api/core-api-service';

console.log('FOR REAL?')

export class EndpointManager {
  records: any[] = [];
  @bindable title: string = null;
  @bindable columns: Column = <Column>{};
  @bindable apiService: CoreApiService;


  apiServiceChanged() {
    this.getAllRecords();
  }

  protected getAllRecords() {
    this.apiService.getAll()
    .then((records) => this.records = records);
  }
}

export interface Column {
  [header: string]: string;
}
