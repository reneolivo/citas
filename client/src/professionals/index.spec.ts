import {ProfessionalsIndex} from './index';

describe('ProfessionalsIndex', () => {
  let controller;
  let professionalSrv;
  let toast

  beforeEach(() => {
    professionalSrv = jasmine.createSpyObj('Professionals', [
      'getAll',
      'create',
      'update',
      'delete'
    ]);
    toast = jasmine.createSpyObj('Toast', [
      'success',
      'error',
      'warning'
    ]);
    controller = new ProfessionalsIndex(
      professionalSrv,
      toast
    );
  });

  it('should define a professionals property', () => {
    expect(controller.professionals).toEqual([]);
  });

  it('should define a selectedProfessionals property', () => {
    expect(controller.selectedProfessionals).toEqual([]);
  });

  it('should define a created method', () => {
    expect(typeof controller.created).toBe('function');
  });

  it('should get all professionals on created', (next) => {
    const professionals = [
      { firstName: 'Léon', lastName: 'The Professional' }
    ];
    professionalSrv.getAll.and
    .returnValue(Promise.resolve(professionals));

    controller.created();

    setTimeout(() => {
      expect(professionalSrv.getAll).toHaveBeenCalled();
      expect(controller.professionals).toBe(professionals);
      next();
    }, 0);
  });

  it('should define a .deleteSelectedProfessionals() method', () => {
    expect(typeof controller.deleteSelectedProfessionals).toBe('function');
  });

  describe('deleting professionals', () => {
    beforeEach(() => {
      controller.selectedProfessionals = [
        { id: 3, firstName: 'Sansa', lastName: 'Stark' },
        { id: 5, firstName: 'Jora', lastName: 'Mormont' }
      ];

      professionalSrv.delete.and.returnValue(Promise.resolve());
    });

    it('should delete all selected professionals', () => {
      controller.deleteSelectedProfessionals();

      expect(professionalSrv.delete).toHaveBeenCalledWith(3);
      expect(professionalSrv.delete).toHaveBeenCalledWith(5);
    });

    it(`should display ONE success message when
      the professionals have been deleted`, (next) => {
      controller.deleteSelectedProfessionals();

      setTimeout(() => {
        expect(toast.success).toHaveBeenCalled();
        expect(toast.success.calls.count()).toBe(1);
        next();
      }, 0);
    });

    it(`should display ONE error message when
      any of the professionals have not been deleted successfully`, (next) => {
      professionalSrv.delete.and.returnValue(Promise.reject(new Error('not-ok')));
      controller.deleteSelectedProfessionals();

      setTimeout(() => {
        expect(toast.error).toHaveBeenCalled();
        expect(toast.error.calls.count()).toBe(1);
        next();
      }, 0);
    });

    it(`should clear the selected professionals after
      deleting them successfully`, (next) => {
      controller.deleteSelectedProfessionals();

      setTimeout(() => {
        expect(controller.selectedProfessionals).toEqual([]);
        next();
      }, 0);
    });

    it(`should not clear the selected professionals
      if they could not be deleted successfully`, (next) => {
      professionalSrv.delete.and.returnValue(Promise.reject(new Error('not-ok')));
      controller.deleteSelectedProfessionals();

      setTimeout(() => {
        expect(controller.selectedProfessionals).not.toEqual([]);
        next();
      }, 0);
    });

    it(`should reload the list of professionals after
      deleting any professional`, (next) => {
      spyOn(controller, 'loadProfessionals');
      controller.deleteSelectedProfessionals();

      setTimeout(() => {
        expect(controller.loadProfessionals).toHaveBeenCalled();
        next();
      }, 0);
    });
  });
});
