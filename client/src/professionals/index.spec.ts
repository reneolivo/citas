import {ProfessionalsIndex} from './index';
import Professionals from '../services/api/professionals';

describe('ProfessionalsIndex', () => {
  let controller;
  let professionalSrv;

  beforeEach(() => {
    professionalSrv = new Professionals();
    controller = new ProfessionalsIndex(
      professionalSrv
    );
  });

  it('should define a professionals property', () => {
    expect(controller.professionals).toEqual([]);
  });

  it('should define a created method', () => {
    expect(typeof controller.created).toBe('function');
  });

  it('should get all professionals on created', (next) => {
    const professionals = [
      { firstName: 'Léon', lastName: 'The Professional' }
    ];
    spyOn(professionalSrv, 'getAll')
    .and.returnValue(Promise.resolve(professionals));

    controller.created();

    setTimeout(() => {
      expect(professionalSrv.getAll).toHaveBeenCalled();
      expect(controller.professionals).toBe(professionals);
      next();
    }, 0);
  });
});
