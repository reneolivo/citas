import {CoreApiModel} from './core-api-model';

export class AvailabilityModel extends CoreApiModel {
  professionalId: number;
  weekDay: number;
  timeStarts: number;
  timeEnds: number;
  limit: number;
}
