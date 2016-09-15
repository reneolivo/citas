import {CoreApiService} from '../core-api-service';
import {CoreApiModel} from '../models/core-api-model';

export class ApiForm<T extends CoreApiModel> {
  protected record: CoreApiModel = new CoreApiModel();

  constructor(
    protected apiService: CoreApiService,
    protected modelClass: new (data?: Object) => T
  ) {
    this.reset();
  }

  load(record: T) {
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
