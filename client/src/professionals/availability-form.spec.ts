import {AvailabilityForm} from './availability-form';

describe('AvailabilityForm', () => {
  let component;
  let availabilities;
  let availabilityTemplates;
  let promise;
  let templates;

  beforeEach(() => {
    const methods = ['getAll', 'create', 'update', 'delete'];

    templates = [
      { id: 1, timeStarts: 8, timeEnds: 14, limit: 50 },
      { id: 2, timeStarts: 14, timeEnds: 20, limit: 50 }
    ];

    promise = Promise.resolve(templates);

    availabilities = jasmine.createSpyObj('Availabilities', methods);
    availabilityTemplates = jasmine.createSpyObj('AvailabilityTemplates', methods);

    methods.forEach((method) => {
      availabilities[ method ].and.returnValue(promise);
      availabilityTemplates[ method ].and.returnValue(promise);
    });

    component = new AvailabilityForm(availabilities, availabilityTemplates);
  });

  it('should define a .templates property', () => {
    expect(component.templates).toEqual([]);
  });

  it('should load all availability templates when constructed', (next) => {
    expect(availabilityTemplates.getAll).toHaveBeenCalled();

    setTimeout(() => {
      expect(component.templates).toEqual(templates);
      next();
    }, 0);
  });

  describe('Availability Matcher', () => {
    it('should define a .availabilityMatcher() method', () => {
      expect(typeof component.availabilityMatcher).toBe('function');
    });

    it('should return true if param A and param B are equal', () => {
      const paramA = { id: 1, weekDay: 2, timeStarts: 10, timeEnds: 12, limit: 40 };
      const paramB = { id: 1, weekDay: 2, timeStarts: 10, timeEnds: 12, limit: 40 };
      const result = component.availabilityMatcher(paramA, paramB);
      expect(result).toBe(true);
    });

    it('should return false if param A and param B are not equal', () => {
      const paramA = { id: 1, weekDay: 2, timeStarts: 10, timeEnds: 12, limit: 40 };
      const paramB = { id: 2, weekDay: 3, timeStarts: 10, timeEnds: 12, limit: 40 };
      const result = component.availabilityMatcher(paramA, paramB);
      expect(result).toBe(false);
    });
  });
});
