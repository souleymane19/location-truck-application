import { ITruckMySuffix, NewTruckMySuffix } from './truck-my-suffix.model';

export const sampleWithRequiredData: ITruckMySuffix = {
  id: 26700,
};

export const sampleWithPartialData: ITruckMySuffix = {
  id: 11016,
  regionName: 'au point que concurrence svelte',
  licensePlate: 'soit si',
  imageUrl: 'juriste tsoin-tsoin',
};

export const sampleWithFullData: ITruckMySuffix = {
  id: 1284,
  regionName: 'chef',
  licensePlate: 'pauvre secouriste',
  imageUrl: 'commis de cuisine combler atchoum',
  model: 'GRAND',
};

export const sampleWithNewData: NewTruckMySuffix = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
