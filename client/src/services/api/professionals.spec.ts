import {Professionals} from './professionals';
import {CoreApiService} from './core-api-service';

describe('Professionals', () => {
  let service;
  let http;
  let promise;

  beforeEach(() => {
    promise = Promise.resolve('ok');
    http = jasmine.createSpyObj('Http', ['get','post','put','delete']);
    http.get.and.returnValue(promise);
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

    beforeEach(() => {
      spyOn(service, 'replace').and.returnValue(promise);
    });

    describe('Getting availabilities', () => {
      it('should define a .getAvailabilities() method', () => {
        expect(typeof service.getAvailabilities).toBe('function');
      });

      it('should get all availabilities', () => {
        const url = `${service.endpoint}/${professionalId}/availabilities`;

        service.getAvailabilities(professionalId);

        expect(http.get).toHaveBeenCalledWith(jasmine.stringMatching(url));
      });

      it('should return a promise', () => {
        const result = service.getAvailabilities(professionalId);
        expect(result).toBe(promise);
      });
    });

    describe('Setting availabilities', () => {
      it('should define an .setAvailabilities() method', () => {
        expect(typeof service.setAvailabilities).toBe('function');
      });

      it('should replace the availabilities for a professional', () => {
        service.setAvailabilities(professionalId, availabilities);

        expect(service.replace).toHaveBeenCalledWith(
          `${professionalId}/availabilities`,
          availabilities
        );
      });

      it('should return a promise', () => {
        const result = service.setAvailabilities(professionalId, availabilities);
        expect(result).toBe(promise);
      });
    });
  });
});
