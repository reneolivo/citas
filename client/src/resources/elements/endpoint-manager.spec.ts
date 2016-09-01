import {EndpointManager} from './endpoint-manager';

describe('EndpointManager', () => {
  let element;
  let apiService;
  let records;

  beforeEach(() => {
    records = [
      { id: 1, firstName: 'Jon', lastName: 'Snow' },
      { id: 2, firstName: 'Ned', lastName: 'Stark' },
      { id: 3, firstName: 'Jora', lastName: 'Mormont' },
    ];

    apiService = jasmine.createSpyObj('ApiService', [
      'getAll',
      'create',
      'update',
      'delete'
    ]);

    apiService.getAll.and.returnValue(Promise.resolve(records));

    element = new EndpointManager();
    element.apiService = apiService;
  });

  describe('Properties', () => {
    it('should define a .title property', () => {
      expect(element.title).toBeDefined();
    });

    it('should define a .columns property', () => {
      expect(element.columns).toEqual({});
    });

    it('should define a .records property', () => {
      expect(element.records).toEqual([]);
    });
  });

  describe('loading records', () => {
    it('should define an .apiServiceChanged() method', () => {
      expect(typeof element.apiServiceChanged).toBe('function');
    });

    it('should call .apiService.getAll()', () => {
      element.apiServiceChanged(apiService);
      expect(apiService.getAll).toHaveBeenCalled();
    });

    it('should populate the .records property', (next) => {
      element.apiServiceChanged(apiService);
      setTimeout(() => {
        expect(element.records).toBe(records);
        next();
      }, 0);
    });
  });

});
