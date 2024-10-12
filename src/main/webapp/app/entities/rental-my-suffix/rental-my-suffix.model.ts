import { ITruckMySuffix } from 'app/entities/truck-my-suffix/truck-my-suffix.model';

export interface IRentalMySuffix {
  id: number;
  streetAddress?: string | null;
  postalCode?: string | null;
  city?: string | null;
  stateProvince?: string | null;
  rentals?: Pick<ITruckMySuffix, 'id'> | null;
}

export type NewRentalMySuffix = Omit<IRentalMySuffix, 'id'> & { id: null };
