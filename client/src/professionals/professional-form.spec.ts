import {ProfessionalForm,
        ProfessionalModel} from './professional-form';

describe('ProfessionalForm', () => {
  let component;
  let modal;
  let service;
  let jonSnow;

  beforeEach(() => {
    service = jasmine.createSpyObj('Professionals', [ 'create', 'update' ]);
    jonSnow = {
      id: 1,
      firstName: 'Jon',
      lastName: 'Snow'
    };

    component = new ProfessionalForm(service);
  });

  it(`should replace the .professional property if .load()
  is called with a professional parameter`, () => {
    let proJonSnow = new ProfessionalModel(jonSnow);
    component.load(jonSnow);
    expect(component.professional).toEqual(proJonSnow);
  });

  it('should reset the .professional property when .reset() is called', () => {
    let professional = component.professional;
    component.reset();
    expect(component.professional).not.toBe(professional);
  });

  it('should create a new professional when .submit() is called', () => {
    let professional = component.professional;
    component.submit();
    expect(service.create).toHaveBeenCalledWith(professional);
  });

  it(`should update the professional when .professional.id is present
    and .submit() is called`, () => {
    component.professional = jonSnow;
    component.submit();
    expect(service.update).toHaveBeenCalledWith(jonSnow.id, jonSnow);
  });
});
