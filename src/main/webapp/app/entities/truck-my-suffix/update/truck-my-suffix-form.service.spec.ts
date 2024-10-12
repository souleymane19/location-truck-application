import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../truck-my-suffix.test-samples';

import { TruckMySuffixFormService } from './truck-my-suffix-form.service';

describe('TruckMySuffix Form Service', () => {
  let service: TruckMySuffixFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TruckMySuffixFormService);
  });

  describe('Service methods', () => {
    describe('createTruckMySuffixFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTruckMySuffixFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            regionName: expect.any(Object),
            licensePlate: expect.any(Object),
            imageUrl: expect.any(Object),
            model: expect.any(Object),
          }),
        );
      });

      it('passing ITruckMySuffix should create a new form with FormGroup', () => {
        const formGroup = service.createTruckMySuffixFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            regionName: expect.any(Object),
            licensePlate: expect.any(Object),
            imageUrl: expect.any(Object),
            model: expect.any(Object),
          }),
        );
      });
    });

    describe('getTruckMySuffix', () => {
      it('should return NewTruckMySuffix for default TruckMySuffix initial value', () => {
        const formGroup = service.createTruckMySuffixFormGroup(sampleWithNewData);

        const truck = service.getTruckMySuffix(formGroup) as any;

        expect(truck).toMatchObject(sampleWithNewData);
      });

      it('should return NewTruckMySuffix for empty TruckMySuffix initial value', () => {
        const formGroup = service.createTruckMySuffixFormGroup();

        const truck = service.getTruckMySuffix(formGroup) as any;

        expect(truck).toMatchObject({});
      });

      it('should return ITruckMySuffix', () => {
        const formGroup = service.createTruckMySuffixFormGroup(sampleWithRequiredData);

        const truck = service.getTruckMySuffix(formGroup) as any;

        expect(truck).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITruckMySuffix should not enable id FormControl', () => {
        const formGroup = service.createTruckMySuffixFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTruckMySuffix should disable id FormControl', () => {
        const formGroup = service.createTruckMySuffixFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
