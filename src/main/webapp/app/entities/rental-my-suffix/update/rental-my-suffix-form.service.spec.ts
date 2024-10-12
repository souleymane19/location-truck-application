import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../rental-my-suffix.test-samples';

import { RentalMySuffixFormService } from './rental-my-suffix-form.service';

describe('RentalMySuffix Form Service', () => {
  let service: RentalMySuffixFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalMySuffixFormService);
  });

  describe('Service methods', () => {
    describe('createRentalMySuffixFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRentalMySuffixFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            streetAddress: expect.any(Object),
            postalCode: expect.any(Object),
            city: expect.any(Object),
            stateProvince: expect.any(Object),
            rentals: expect.any(Object),
          }),
        );
      });

      it('passing IRentalMySuffix should create a new form with FormGroup', () => {
        const formGroup = service.createRentalMySuffixFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            streetAddress: expect.any(Object),
            postalCode: expect.any(Object),
            city: expect.any(Object),
            stateProvince: expect.any(Object),
            rentals: expect.any(Object),
          }),
        );
      });
    });

    describe('getRentalMySuffix', () => {
      it('should return NewRentalMySuffix for default RentalMySuffix initial value', () => {
        const formGroup = service.createRentalMySuffixFormGroup(sampleWithNewData);

        const rental = service.getRentalMySuffix(formGroup) as any;

        expect(rental).toMatchObject(sampleWithNewData);
      });

      it('should return NewRentalMySuffix for empty RentalMySuffix initial value', () => {
        const formGroup = service.createRentalMySuffixFormGroup();

        const rental = service.getRentalMySuffix(formGroup) as any;

        expect(rental).toMatchObject({});
      });

      it('should return IRentalMySuffix', () => {
        const formGroup = service.createRentalMySuffixFormGroup(sampleWithRequiredData);

        const rental = service.getRentalMySuffix(formGroup) as any;

        expect(rental).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRentalMySuffix should not enable id FormControl', () => {
        const formGroup = service.createRentalMySuffixFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRentalMySuffix should disable id FormControl', () => {
        const formGroup = service.createRentalMySuffixFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
