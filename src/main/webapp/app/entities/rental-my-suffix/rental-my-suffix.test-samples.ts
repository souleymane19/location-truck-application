import { IRentalMySuffix, NewRentalMySuffix } from './rental-my-suffix.model';

export const sampleWithRequiredData: IRentalMySuffix = {
  id: 26414,
};

export const sampleWithPartialData: IRentalMySuffix = {
  id: 24907,
  streetAddress: 'payer longtemps émérite',
  postalCode: 'fidèle',
};

export const sampleWithFullData: IRentalMySuffix = {
  id: 28708,
  streetAddress: 'cuicui meuh de façon que',
  postalCode: 'adepte coin-coin améliorer',
  city: 'Quimper',
  stateProvince: 'toc à partir de',
};

export const sampleWithNewData: NewRentalMySuffix = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
