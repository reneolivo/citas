import {CoreApiService} from '../core-api-service';
import {CoreApiModel} from '../models/core-api-model';

export class ApiForm {
  protected record: Object = {};

  constructor(
    protected apiService: CoreApiService,
    protected modelClass: CoreApiModel
  ) {
    this.reset();
  }

  load(record: Object) {
    this.record = new this.modelClass(record);
  }

  reset() {
    this.record = new this.modelClass();
  }

  submit() {
    if (this.record.id) {
      return this.apiService.update(
        this.record.id,
        this.record
      );
    } else {
      return this.apiService.create(
        this.record
      );
    }
  }
}
