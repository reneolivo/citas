import {autoinject} from 'aurelia-framework';
import {Http} from '../helpers/http';

export class CoreApiService {
  baseUrl: string = 'http://localhost:3000/api/';
  endpoint: string = '';

  constructor(protected http: Http) {}

  getAll() {
    return this.http.get(this.getUrl());
  }

  create(data: any = {}) {
    return this.http.post(this.getUrl(), data);
  }

  update(id: number, data: any = {}) {
    return this.http.put(this.getUrl(id), data);
  }

  delete(id: number) {
    return this.http.delete(this.getUrl(id));
  }

  protected getUrl(recordId?: number) {
    let url = `${this.baseUrl}${this.endpoint}`;

    if (recordId) url += `/${recordId}`;

    return url;
  }
}
