import Professionals from './professionals';
declare const jQuery: any;

describe('Professionals', () => {
  let service;

  beforeEach(() => service = new Professionals());

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
});
