import {Professionals} from './professionals';
import {CoreApiService} from './core-api-service';

describe('Professionals', () => {
  let service;

  beforeEach(() => service = new Professionals());

  it('should be defined', () => {
    expect(Professionals).toBeDefined();
    expect(service).toBeDefined();
    expect(service.endpoint).toBeDefined();
  });

  it('should extend CoreApiService', () => {
    expect(service instanceof CoreApiService).toBe(true);
  });
});
