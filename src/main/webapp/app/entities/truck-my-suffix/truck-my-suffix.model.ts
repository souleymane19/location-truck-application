import { Model } from 'app/entities/enumerations/model.model';

export interface ITruckMySuffix {
  id: number;
  regionName?: string | null;
  licensePlate?: string | null;
  imageUrl?: string | null;
  model?: keyof typeof Model | null;
}

export type NewTruckMySuffix = Omit<ITruckMySuffix, 'id'> & { id: null };
