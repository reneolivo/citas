import {ProfessionalDialog,
        ProfessionalModel} from './professional-dialog';
import * as aurelia from 'aurelia-framework';

describe('ProfessionalDialog', () => {
  let component;
  let modal;
  let service;
  let jonSnow;

  beforeEach(() => {
    modal = jasmine.createSpyObj('Modal', [ 'open', 'close' ]);
    service = jasmine.createSpyObj('Professionals', [ 'create', 'update' ]);
    jonSnow = {
      id: 1,
      firstName: 'Jon',
      lastName: 'Snow'
    };

    component = new ProfessionalDialog(service);
    component.modal = modal;
  });

  it('should open the modal when .open() is called', () => {
    component.open();
    expect(modal.open).toHaveBeenCalled();
  });

  it(`should replace the .professional property if .open()
  is called with a professional parameter`, () => {
    let proJonSnow = new ProfessionalModel(jonSnow);
    component.open(jonSnow);
    expect(component.professional).toEqual(proJonSnow);
  });

  it(`should not set the .professional property if .open()
  is called but not professional parameter is passed`, () => {
    let professional = component.professional;
    component.open();
    expect(component.professional).toEqual(professional);
  });

  it('should close the modal when .close() is called', () => {
    component.close();
    expect(modal.close).toHaveBeenCalled();
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
