export class CoreApiModel {
  id: number = null;

  constructor(record: Object = {}) {
    Object.assign(this, record || {});
  }
}
