import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ITruckMySuffix } from '../truck-my-suffix.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../truck-my-suffix.test-samples';

import { TruckMySuffixService } from './truck-my-suffix.service';

const requireRestSample: ITruckMySuffix = {
  ...sampleWithRequiredData,
};

describe('TruckMySuffix Service', () => {
  let service: TruckMySuffixService;
  let httpMock: HttpTestingController;
  let expectedResult: ITruckMySuffix | ITruckMySuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TruckMySuffixService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a TruckMySuffix', () => {
      const truck = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(truck).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TruckMySuffix', () => {
      const truck = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(truck).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TruckMySuffix', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TruckMySuffix', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TruckMySuffix', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTruckMySuffixToCollectionIfMissing', () => {
      it('should add a TruckMySuffix to an empty array', () => {
        const truck: ITruckMySuffix = sampleWithRequiredData;
        expectedResult = service.addTruckMySuffixToCollectionIfMissing([], truck);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(truck);
      });

      it('should not add a TruckMySuffix to an array that contains it', () => {
        const truck: ITruckMySuffix = sampleWithRequiredData;
        const truckCollection: ITruckMySuffix[] = [
          {
            ...truck,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTruckMySuffixToCollectionIfMissing(truckCollection, truck);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TruckMySuffix to an array that doesn't contain it", () => {
        const truck: ITruckMySuffix = sampleWithRequiredData;
        const truckCollection: ITruckMySuffix[] = [sampleWithPartialData];
        expectedResult = service.addTruckMySuffixToCollectionIfMissing(truckCollection, truck);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(truck);
      });

      it('should add only unique TruckMySuffix to an array', () => {
        const truckArray: ITruckMySuffix[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const truckCollection: ITruckMySuffix[] = [sampleWithRequiredData];
        expectedResult = service.addTruckMySuffixToCollectionIfMissing(truckCollection, ...truckArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const truck: ITruckMySuffix = sampleWithRequiredData;
        const truck2: ITruckMySuffix = sampleWithPartialData;
        expectedResult = service.addTruckMySuffixToCollectionIfMissing([], truck, truck2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(truck);
        expect(expectedResult).toContain(truck2);
      });

      it('should accept null and undefined values', () => {
        const truck: ITruckMySuffix = sampleWithRequiredData;
        expectedResult = service.addTruckMySuffixToCollectionIfMissing([], null, truck, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(truck);
      });

      it('should return initial array if no TruckMySuffix is added', () => {
        const truckCollection: ITruckMySuffix[] = [sampleWithRequiredData];
        expectedResult = service.addTruckMySuffixToCollectionIfMissing(truckCollection, undefined, null);
        expect(expectedResult).toEqual(truckCollection);
      });
    });

    describe('compareTruckMySuffix', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTruckMySuffix(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTruckMySuffix(entity1, entity2);
        const compareResult2 = service.compareTruckMySuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTruckMySuffix(entity1, entity2);
        const compareResult2 = service.compareTruckMySuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTruckMySuffix(entity1, entity2);
        const compareResult2 = service.compareTruckMySuffix(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
