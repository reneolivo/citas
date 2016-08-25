import Professionals from './professionals';
declare const jQuery: any;

describe('Professionals', () => {
  let service;

  beforeEach(() => service = new Professionals());

  describe('getting all professionals', () => {
    it('should define a getAll method', () => {
      expect(typeof service.getAll).toBe('function');
    });

    it('should get the data from the endpoint', () => {
      spyOn(jQuery, 'get');
      service.getAll();
      expect(jQuery.get).toHaveBeenCalledWith(
        jasmine.stringMatching('/api/professionals')
      );
    });

    it('should return a promise', () => {
      const promise = new Promise(() => {});
      let result;

      spyOn(jQuery, 'get').and.returnValue(promise);
      result = service.getAll();
      expect(result).toBe(promise);
    });
  });

  describe('create professionals', () => {
    const data = { firstName: 'Jon', lastName: 'Snow' };

    it('should define a create method', () => {
      expect(typeof service.create).toBe('function');
    });

    it('should post the data to the endpoint', () => {
      spyOn(jQuery, 'post');
      service.create(data);
      expect(jQuery.post).toHaveBeenCalledWith(
        jasmine.stringMatching('/api/professionals'),
        data
      );
    });

    it('should return a promise', () => {
      const promise = new Promise(() => {});
      let result;
      spyOn(jQuery, 'post').and.returnValue(promise);
      result = service.create(data);
      expect(result).toBe(promise);
    });
  });

  describe('update professionals', () => {
    const data = { id: 1, firstName: 'Jon', lastName: 'Snow' };

    it('should define an update method', () => {
      expect(typeof service.update).toBe('function');
    });

    it('should post the data to the endpoint', () => {
      spyOn(jQuery, 'ajax');
      service.update(data);
      expect(jQuery.ajax).toHaveBeenCalledWith({
        url: jasmine.stringMatching(`/api/professionals/${data.id}`),
        type: 'PUT',
        data: data
      });
    });

    it('should return a promise', () => {
      const promise = new Promise(() => {});
      let result;
      spyOn(jQuery, 'ajax').and.returnValue(promise);
      result = service.update(data);
      expect(result).toBe(promise);
    });
  })
});
