import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 20524,
  login: 'yxWf4f',
};

export const sampleWithPartialData: IUser = {
  id: 28900,
  login: 'YBZD=@QJ\\"f\\)OuC\\}wB4\\.BE-',
};

export const sampleWithFullData: IUser = {
  id: 29829,
  login: 'K@dPO\\CvV\\Gu-1y3b\\]8',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
