import {CoreApiService} from './core-api-service';
import {AvailabilityModel} from './models/availability';

export class Professionals extends CoreApiService {
  endpoint = 'professionals';

  availabilities(id: number, data: AvailabilityModel[] = []) {
    const subendpoint = `${id}/availabilities`;

    return this.replace(subendpoint, data);
  }
}
