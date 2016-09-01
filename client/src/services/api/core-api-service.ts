import {autoinject} from 'aurelia-framework';
import {Http} from '../helpers/http';

export class CoreApiService {
  baseUrl: string = '';

  constructor(protected http: Http) {}

  getAll() {
    return this.http.get(this.baseUrl);
  }

  create(data: any = {}) {
    return this.http.post(this.baseUrl, data);
  }

  update(id: number, data: any = {}) {
    return this.http.put(`${this.baseUrl}${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}${id}`);
  }
}
