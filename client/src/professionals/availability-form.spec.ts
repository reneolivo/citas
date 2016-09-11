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
      { weekDay: 1, timeStarts: 8, timeEnds: 12 },
      { weekDay: 2, timeStarts: 8, timeEnds: 12 },
      { weekDay: 3, timeStarts: 8, timeEnds: 12 }
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

  it('define a .templates property', () => {
    expect(component.templates).toEqual([]);
  });

  it('should load all availability templates when constructed', (next) => {
    expect(availabilityTemplates.getAll).toHaveBeenCalled();

    setTimeout(() => {
      expect(component.templates).toEqual(templates);
      next();
    }, 0);
  });
});
