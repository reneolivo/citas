import {ApiForm} from './api-form';
import {CoreApiModel} from '../models/core-api-model';

describe('ApiForm', () => {
  let component;
  let modal;
  let service;
  let jonSnow;
  let promise;

  beforeEach(() => {
    promise = Promise.resolve('ok');

    service = jasmine.createSpyObj('CoreApiService', ['create', 'update']);
    service.create.and.returnValue(promise);
    service.update.and.returnValue(promise);

    jonSnow = {
      firstName: 'Jon',
      lastName: 'Snow'
    };

    component = new ApiForm(service, CoreApiModel);
  });

  it('should define a .apiService property', () => {
    expect(component.apiService).toBe(service);
  });

  it('should define a .modelClass property', () => {
    expect(component.modelClass).toBe(CoreApiModel);
  });

  it('should define a .record property', () => {
    const model = new CoreApiModel({});

    expect(component.record).toEqual(model);
  });

  it('should define a load .load() method', () => {
    expect(typeof component.load).toBe('function');
  });

  it(`should replace the .record property if .load()
  is called with a record parameter`, () => {
    let JonSnowModel = new CoreApiModel(jonSnow);
    component.load(jonSnow);
    expect(component.record).toEqual(JonSnowModel);
  });

  it('should define a .reset() method', () => {
    expect(typeof component.reset).toBe('function');
  });

  it('should reset the .record property when .reset() is called', () => {
    component.record = jonSnow;
    component.reset();
    expect(component.record).not.toBe(jonSnow);
  });

  it('should define a .submit() method', () => {
    expect(typeof component.submit).toBe('function');
  });

  describe('create', () => {
    beforeEach(() => component.record = jonSnow);

    it('should create a new record when .submit() is called', () => {
      component.submit();
      expect(service.create).toHaveBeenCalledWith(jonSnow);
    });

    it('should return a promise', () => {
      const result = component.submit();
      expect(result).toBe(promise);
    });
  });

  describe('update', () => {
    beforeEach(() => {
      jonSnow.id = 1;
      component.record = jonSnow;
    });

    it(`should update the professional when .record.id is present
      and .submit() is called`, () => {
      component.submit();
      expect(service.update).toHaveBeenCalledWith(jonSnow.id, jonSnow);
    });

    it('should return a promise', () => {
      const result = component.submit();
      expect(result).toBe(promise);
    });
  });

});
