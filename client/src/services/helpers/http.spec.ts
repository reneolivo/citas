import {Http} from './http';
declare const jQuery: any;

describe('Http', () => {
  const url = 'http://example.com/';
  const data = { payload: 'ABC' };
  const promise = Promise.resolve('ok');
  const http;

  beforeEach(() => {
    spyOn(jQuery, 'get').and.returnValue(promise);
    spyOn(jQuery, 'post').and.returnValue(promise);
    spyOn(jQuery, 'ajax').and.returnValue(promise);

    http = new Http();
  });

  describe('GET', () => {
    it('should define a .get() method', () => {
      expect(typeof http.get).toBe('function');
    });

    it('should call jQuery.get', () => {
      http.get(url);
      expect(jQuery.get).toHaveBeenCalledWith(url);
    });

    it('should return a promise', () => {
      const result = http.get(url);
      expect(result).toBe(promise);
    });
  });

  describe('POST', () => {
    it('should define a .post() method', () => {
      expect(typeof http.post).toBe('function');
    });

    it('should call jQuery.post', () => {
      http.post(url, data);
      expect(jQuery.post).toHaveBeenCalledWith(url, data);
    });

    it('should return a promise', () => {
      const result = http.post(url, data);
      expect(result).toBe(promise);
    });
  });

  describe('PUT', () => {
    it('should define a .put() method', () => {
      expect(typeof http.put).toBe('function');
    });

    it('should call jQuery.ajax', () => {
      http.put(url, data);
      expect(jQuery.ajax).toHaveBeenCalledWith({
        url: url,
        type: 'PUT',
        data: data
      });
    });

    it('should return a promise', () => {
      const result = http.put(url, data);
      expect(result).toBe(promise);
    });
  });

  describe('DELETE', () => {
    it('should define a .delete() method', () => {
      expect(typeof http.delete).toBe('function');
    });

    it('should call jQuery.ajax', () => {
      http.delete(url);
      expect(jQuery.ajax).toHaveBeenCalledWith({
        url: url,
        type: 'DELETE'
      });
    });

    it('should return a promise', () => {
      const result = http.delete(url, data);
      expect(result).toBe(promise);
    });
  });
});
