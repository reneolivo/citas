declare const jQuery: any;

export default class Professional {
  protected endpoint = 'http://localhost:3000/api/professionals';
  getAll() {
    return jQuery.get(this.endpoint);
  }

  create(data) {
    return jQuery.post(this.endpoint, data);
  }

  update(data) {
    return jQuery.ajax({
      url: `${this.endpoint}/${data.id}`,
      type: 'PUT',
      data: data
    });
  }

  delete(id) {
    return jQuery.ajax({
      url: `${this.endpoint}/${id}`,
      type: 'DELETE'
    });
  }
}
