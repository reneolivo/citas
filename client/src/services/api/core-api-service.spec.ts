import {CoreApiService} from './core-api-service';

describe('CoreApiService', () => {
  const promise = Promise.resolve('ok');
  let service;
  let http;

  beforeEach(() => {
    const httpMethods = ['get', 'post', 'put', 'delete'];
    http = jasmine.createSpyObj('Http', httpMethods);
    httpMethods.forEach((method) => {
      http[method].and.returnValue(promise);
    });

    service = new CoreApiService(http);
  });

  describe('core api properties', () => {
    it('should define a .baseUrl property', () => {
      expect(service.baseUrl).toBeDefined();
    });

    it('should define an .endpoint property', () => {
      expect(service.endpoint).toBeDefined();
    });
  });

  describe('core api methods', () => {
    const baseUrl = 'http://example.com/';
    const endpoint = 'example';
    const id = 10;
    const data = { payload: 'ABC' };

    beforeEach(() => {
      service.baseUrl = baseUrl;
      service.endpoint = endpoint;
    });

    describe('get all records', () => {
      it('should define a .getAll() method', () => {
        expect(typeof service.getAll).toBe('function');
      });

      it('should call http.get()', () => {
        service.getAll();
        expect(http.get).toHaveBeenCalledWith(`${baseUrl}${endpoint}`);
      });

      it('should return a promise', () => {
        const result = service.getAll();
        expect(result).toBe(promise);
      });
    });

    describe('filtering records', () => {
      it('should add a filtering condition if a parameter is provided', () => {
        const filter = { condition: 'ABC' };

        service.getAll(filter);

        expect(http.get).toHaveBeenCalledWith(
          jasmine.stringMatching(/filter\[where\]\[condition\]=ABC/)
        );
      });

      it('should accept several filtering conditions', () => {
        const filters = {
          condition1: 'ABC',
          condition2: 'XYZ'
        };

        service.getAll(filters);

        expect(http.get).toHaveBeenCalledWith(
          jasmine.stringMatching(
            /filter\[where\]\[condition1\]=ABC&filter\[where\]\[condition2\]=XYZ/
          )
        );
      });

      it('should not add any filters if no parameters are provided', () => {
        service.getAll();
        expect(http.get).not.toHaveBeenCalledWith(
          jasmine.stringMatching('filter[where]')
        );
      });
    });

    describe('create new record', () => {
      it('should define a .create() method', () => {
        expect(typeof service.create).toBe('function');
      });

      it('should call http.post()', () => {
        service.create(data);
        expect(http.post).toHaveBeenCalledWith(
          `${baseUrl}${endpoint}`,
          data
        );
      });

      it('should return a promise', () => {
        const result = service.create(data);
        expect(result).toBe(promise);
      });
    });

    describe('update an existing record', () => {
      it('should define an .update() method', () => {
        expect(typeof service.update).toBe('function');
      });

      it('should call http.put()', () => {
        service.update(id, data);
        expect(http.put).toHaveBeenCalledWith(
          `${baseUrl}${endpoint}/${id}`,
          data
        );
      });

      it('should return a promise', () => {
        const result = service.update(id, data);
        expect(result).toBe(promise);
      });
    });

    describe('delete an existing record', () => {
      it('should define a .delete() method', () => {
        expect(typeof service.delete).toBe('function');
      });

      it('should call http.delete()', () => {
        service.delete(id);
        expect(http.delete).toHaveBeenCalledWith(
          `${baseUrl}${endpoint}/${id}`,
        );
      });

      it('should return a promise', () => {
        const result = service.delete(id);
        expect(result).toBe(promise);
      });
    });
  });
});
