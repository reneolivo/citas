import {CoreApiService} from './core-api-service';
import {AvailabilityModel} from './models/availability';

export class Professionals extends CoreApiService {
  endpoint = 'professionals';

  getAvailabilities(id: number): Promise<AvailabilityModel[]> {
    const url = this.getUrl() + `/${id}/availabilities`;

    return this.http.get(url);
  }

  setAvailabilities(id: number, data: AvailabilityModel[] = []):
  Promise<AvailabilityModel[]> {
    const subendpoint = `${id}/availabilities`;

    return this.replace(subendpoint, data);
  }
}
