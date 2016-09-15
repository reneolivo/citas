import {autoinject} from 'aurelia-framework';
import {Http} from '../helpers/http';

@autoinject
export class CoreApiService {
  baseUrl: string = 'http://localhost:3000/api/';
  endpoint: string = '';

  constructor(protected http: Http) {}

  getAll(filters: Object = null) {
    return this.http.get(this.getUrl(null, filters));
  }

  create(data: Object = {}) {
    return this.http.post(
      this.getUrl(),
      this.getPlainObject(data)
    );
  }

  update(id: number, data: Object = {}) {
    return this.http.put(
      this.getUrl(id),
      this.getPlainObject(data)
    );
  }

  delete(id: number) {
    return this.http.delete(this.getUrl(id));
  }

  protected getUrl(
    append: number|string = null,
    filters: Object = null
  ) {
    let url = `${this.baseUrl}${this.endpoint}`;

    if (append) url += `/${append}`;

    if (filters !== null) {
      url += '?' + this.getFilterString(filters);
    }

    return url;
  }

  protected getFilterString(filters: Object) {
    let filterString = '';

    for(var key in filters) {
      filterString += `filter[where][${key}]=${filters[key]}&`
    }

    return filterString;
  }

  // Note:
  // jQuery.post and jQuery.ajax seem to call the object constructor
  // so we need to send a plain JS Object to avoid unexpected erros
  protected getPlainObject(data: Object) {
    return Object.assign({}, data);
  }
}
