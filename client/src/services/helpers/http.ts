declare const jQuery: any;

export class Http {
  get(url: string) {
    return jQuery.get(url);
  }

  post(url: string, data: Object | Object[] = {}) {
    return jQuery.ajax({
      url: url,
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json'
    });
  }

  put(url: string, data: Object = {}) {
    return jQuery.ajax({
      url: url,
      type: 'PUT',
      data: data
    });
  }

  delete(url: string) {
    return jQuery.ajax({
      url: url,
      type: 'DELETE'
    });
  }
}
