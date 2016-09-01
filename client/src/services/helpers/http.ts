declare const jQuery: any;

export class Http {
  get(url: string) {
    return jQuery.get(url);
  }

  post(url: string, data: any = {}) {
    return jQuery.post(url, data);
  }

  put(url: string, data: any = {}) {
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
