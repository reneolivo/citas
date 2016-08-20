declare const jQuery: any;

export default class Professional {
  create(data) {
    const url = 'http://localhost:3000/api/professionals';
    return jQuery.post(url, data);
  }
}
