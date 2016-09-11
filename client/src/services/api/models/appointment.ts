import {CoreApiModel} from './core-api-model';
import {ClientModel} from './client';

export class AppointmentModel extends CoreApiModel {
  client: ClientModel;
  availabilityId: number;
  date: Date;
  notes: string;
}
