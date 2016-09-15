import {Professionals} from './professionals';
import {CoreApiService} from './core-api-service';

describe('Professionals', () => {
  let service;

  beforeEach(() => {
    const http = jasmine.createSpyObj('Http', ['get','post','put','delete']);
    service = new Professionals(http);
  });

  it('should be defined', () => {
    expect(Professionals).toBeDefined();
    expect(service).toBeDefined();
    expect(service.endpoint).toBeDefined();
  });

  it('should extend CoreApiService', () => {
    expect(service instanceof CoreApiService).toBe(true);
  });

  describe('Availabilities', () => {
    const professionalId = 123;
    const availabilities = [
      { weekDay: 0, timeStarts: 10, timeEnds: 14, limit: 50 }
    ];
    let promise;

    beforeEach(() => {
      promise = Promise.resolve('ok');
      spyOn(service, 'replace').and.returnValue(promise);
    });

    it('should define an .availabilities() method', () => {
      expect(typeof service.availabilities).toBe('function');
    });

    it('should replace the availabilities for a professional', () => {
      service.availabilities(professionalId, availabilities);

      expect(service.replace).toHaveBeenCalledWith(
        `${professionalId}/availabilities`,
        availabilities
      );
    });

    it('should return a promise', () => {
      const result = service.availabilities(professionalId, availabilities);
      expect(result).toBe(promise);
    });
  });
});
