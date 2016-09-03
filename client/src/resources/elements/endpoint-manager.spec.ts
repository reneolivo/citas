import {EndpointManager} from './endpoint-manager';

describe('EndpointManager', () => {
  let element;
  let apiService;
  let records;
  let toast;

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
    apiService.delete.and.returnValue(Promise.resolve());

    toast = jasmine.createSpyObj('Toast', [
      'success',
      'error',
      'warning'
    ]);

    element = new EndpointManager(toast);
    element.apiService = apiService;
  });

  describe('Properties', () => {
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

  describe('deleting records', () => {
    beforeEach(() => {
      element.selectedRecords = [
        records[ 0 ],
        records[ 2 ]
      ];
    });

    it('should delete all selected records', () => {
      element.deleteSelectedRecords();

      expect(apiService.delete).toHaveBeenCalledWith(records[0].id);
      expect(apiService.delete).toHaveBeenCalledWith(records[2].id);
    });

    it('should not delete non-selected records', () => {
      element.deleteSelectedRecords();

      expect(apiService.delete).not.toHaveBeenCalledWith(records[1].id);
    });

    it(`should display ONE success message when
      the records have been deleted`, (next) => {
      element.deleteSelectedRecords();

      setTimeout(() => {
        expect(toast.success).toHaveBeenCalled();
        expect(toast.success.calls.count()).toBe(1);
        next();
      }, 0);
    });

    it(`should display ONE error message when
      any of the records have not been deleted successfully`, (next) => {
      apiService.delete.and.returnValue(
        Promise.reject(new Error('not-ok')
      ));
      element.deleteSelectedRecords();

      setTimeout(() => {
        expect(toast.error).toHaveBeenCalled();
        expect(toast.error.calls.count()).toBe(1);
        next();
      }, 0);
    });

    it(`should clear the selected records after
      deleting them successfully`, (next) => {
      element.deleteSelectedRecords();

      setTimeout(() => {
        expect(element.selectedRecords).toEqual([]);
        next();
      }, 0);
    });

    it(`should not clear the selected records
      if they could not be deleted successfully`, (next) => {
      apiService.delete.and.returnValue(
        Promise.reject(new Error('not-ok')
      ));
      element.deleteSelectedRecords();

      setTimeout(() => {
        expect(element.selectedRecords).not.toEqual([]);
        next();
      }, 0);
    });

    it(`should reload the list of records after
      deleting any record successfully`, (next) => {
      spyOn(element, 'getAllRecords');
      element.deleteSelectedRecords();

      setTimeout(() => {
        expect(element.getAllRecords).toHaveBeenCalled();
        next();
      }, 0);
    });
  });

});
