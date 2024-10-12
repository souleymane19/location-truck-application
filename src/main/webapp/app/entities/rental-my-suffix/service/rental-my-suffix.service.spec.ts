import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IRentalMySuffix } from '../rental-my-suffix.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../rental-my-suffix.test-samples';

import { RentalMySuffixService } from './rental-my-suffix.service';

const requireRestSample: IRentalMySuffix = {
  ...sampleWithRequiredData,
};

describe('RentalMySuffix Service', () => {
  let service: RentalMySuffixService;
  let httpMock: HttpTestingController;
  let expectedResult: IRentalMySuffix | IRentalMySuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(RentalMySuffixService);
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

    it('should create a RentalMySuffix', () => {
      const rental = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(rental).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RentalMySuffix', () => {
      const rental = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(rental).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RentalMySuffix', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RentalMySuffix', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a RentalMySuffix', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addRentalMySuffixToCollectionIfMissing', () => {
      it('should add a RentalMySuffix to an empty array', () => {
        const rental: IRentalMySuffix = sampleWithRequiredData;
        expectedResult = service.addRentalMySuffixToCollectionIfMissing([], rental);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(rental);
      });

      it('should not add a RentalMySuffix to an array that contains it', () => {
        const rental: IRentalMySuffix = sampleWithRequiredData;
        const rentalCollection: IRentalMySuffix[] = [
          {
            ...rental,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRentalMySuffixToCollectionIfMissing(rentalCollection, rental);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RentalMySuffix to an array that doesn't contain it", () => {
        const rental: IRentalMySuffix = sampleWithRequiredData;
        const rentalCollection: IRentalMySuffix[] = [sampleWithPartialData];
        expectedResult = service.addRentalMySuffixToCollectionIfMissing(rentalCollection, rental);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(rental);
      });

      it('should add only unique RentalMySuffix to an array', () => {
        const rentalArray: IRentalMySuffix[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const rentalCollection: IRentalMySuffix[] = [sampleWithRequiredData];
        expectedResult = service.addRentalMySuffixToCollectionIfMissing(rentalCollection, ...rentalArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const rental: IRentalMySuffix = sampleWithRequiredData;
        const rental2: IRentalMySuffix = sampleWithPartialData;
        expectedResult = service.addRentalMySuffixToCollectionIfMissing([], rental, rental2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(rental);
        expect(expectedResult).toContain(rental2);
      });

      it('should accept null and undefined values', () => {
        const rental: IRentalMySuffix = sampleWithRequiredData;
        expectedResult = service.addRentalMySuffixToCollectionIfMissing([], null, rental, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(rental);
      });

      it('should return initial array if no RentalMySuffix is added', () => {
        const rentalCollection: IRentalMySuffix[] = [sampleWithRequiredData];
        expectedResult = service.addRentalMySuffixToCollectionIfMissing(rentalCollection, undefined, null);
        expect(expectedResult).toEqual(rentalCollection);
      });
    });

    describe('compareRentalMySuffix', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRentalMySuffix(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareRentalMySuffix(entity1, entity2);
        const compareResult2 = service.compareRentalMySuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareRentalMySuffix(entity1, entity2);
        const compareResult2 = service.compareRentalMySuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareRentalMySuffix(entity1, entity2);
        const compareResult2 = service.compareRentalMySuffix(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
