import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: 'e0982b13-1053-45d0-b4fc-853ee286ff50',
};

export const sampleWithPartialData: IAuthority = {
  name: '53c538b5-fa64-4817-a712-8bd1e4099af6',
};

export const sampleWithFullData: IAuthority = {
  name: '74aa553d-39da-4213-8fe7-6f4c114c79d8',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
