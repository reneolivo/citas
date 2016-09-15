import {AvailabilityForm} from './availability-form';

describe('AvailabilityForm', () => {
  let component;
  let availabilities;
  let professionals;
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
    professionals = jasmine.createSpyObj('Professionals', methods.concat('availabilities'));

    methods.forEach((method) => {
      availabilities[ method ].and.returnValue(promise);
      professionals[ method ].and.returnValue(promise);
      availabilityTemplates[ method ].and.returnValue(promise);
    });

    professionals.availabilities.and.returnValue(promise);

    component = new AvailabilityForm(
      availabilities,
      availabilityTemplates,
      professionals
    );
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

  describe('getting availabilities for the professional', () => {
    it(`should get all the professional's
    availabilities when .load() is called`, () => {
      component.load({ id: 123 });

      expect(availabilities.getAll).toHaveBeenCalledWith(
        { professionalId: 123 }
      );
    });

    it(`should update the .selectedAvailabilities with the result
    from availabilities.getAll()`, (next) => {
      component.load({ id: 123 });

      setTimeout(() => {
        expect(component.selectedAvailabilities).toBe(templates);
        next();
      }, 0);
    });
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

  describe('submiting availabilities', () => {
    let professionalRecord;
    let availabilities;

    beforeEach(() => {
      professionalRecord = { id: 1, firstName: 'Jon', lastName: 'Snow' };
      availabilities = [ templates[1] ];

      component.selectedAvailabilities = availabilities;
      component.record = professionalRecord;
    });

    it('should call professionals.availabilities()', () => {
      component.submit();

      expect(professionals.availabilities).toHaveBeenCalledWith(
        professionalRecord.id,
        availabilities
      );
    });

    it('should return a promise', () => {
      const result = component.submit();
      expect(result).toBe(promise);
    });
  });
});
