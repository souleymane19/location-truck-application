import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ITruckMySuffix } from 'app/entities/truck-my-suffix/truck-my-suffix.model';
import { TruckMySuffixService } from 'app/entities/truck-my-suffix/service/truck-my-suffix.service';
import { RentalMySuffixService } from '../service/rental-my-suffix.service';
import { IRentalMySuffix } from '../rental-my-suffix.model';
import { RentalMySuffixFormService } from './rental-my-suffix-form.service';

import { RentalMySuffixUpdateComponent } from './rental-my-suffix-update.component';

describe('RentalMySuffix Management Update Component', () => {
  let comp: RentalMySuffixUpdateComponent;
  let fixture: ComponentFixture<RentalMySuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let rentalFormService: RentalMySuffixFormService;
  let rentalService: RentalMySuffixService;
  let truckService: TruckMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RentalMySuffixUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(RentalMySuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RentalMySuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    rentalFormService = TestBed.inject(RentalMySuffixFormService);
    rentalService = TestBed.inject(RentalMySuffixService);
    truckService = TestBed.inject(TruckMySuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TruckMySuffix query and add missing value', () => {
      const rental: IRentalMySuffix = { id: 456 };
      const rentals: ITruckMySuffix = { id: 7619 };
      rental.rentals = rentals;

      const truckCollection: ITruckMySuffix[] = [{ id: 12535 }];
      jest.spyOn(truckService, 'query').mockReturnValue(of(new HttpResponse({ body: truckCollection })));
      const additionalTruckMySuffixes = [rentals];
      const expectedCollection: ITruckMySuffix[] = [...additionalTruckMySuffixes, ...truckCollection];
      jest.spyOn(truckService, 'addTruckMySuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rental });
      comp.ngOnInit();

      expect(truckService.query).toHaveBeenCalled();
      expect(truckService.addTruckMySuffixToCollectionIfMissing).toHaveBeenCalledWith(
        truckCollection,
        ...additionalTruckMySuffixes.map(expect.objectContaining),
      );
      expect(comp.trucksSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const rental: IRentalMySuffix = { id: 456 };
      const rentals: ITruckMySuffix = { id: 15037 };
      rental.rentals = rentals;

      activatedRoute.data = of({ rental });
      comp.ngOnInit();

      expect(comp.trucksSharedCollection).toContain(rentals);
      expect(comp.rental).toEqual(rental);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRentalMySuffix>>();
      const rental = { id: 123 };
      jest.spyOn(rentalFormService, 'getRentalMySuffix').mockReturnValue(rental);
      jest.spyOn(rentalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rental });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rental }));
      saveSubject.complete();

      // THEN
      expect(rentalFormService.getRentalMySuffix).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(rentalService.update).toHaveBeenCalledWith(expect.objectContaining(rental));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRentalMySuffix>>();
      const rental = { id: 123 };
      jest.spyOn(rentalFormService, 'getRentalMySuffix').mockReturnValue({ id: null });
      jest.spyOn(rentalService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rental: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rental }));
      saveSubject.complete();

      // THEN
      expect(rentalFormService.getRentalMySuffix).toHaveBeenCalled();
      expect(rentalService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRentalMySuffix>>();
      const rental = { id: 123 };
      jest.spyOn(rentalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rental });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(rentalService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTruckMySuffix', () => {
      it('Should forward to truckService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(truckService, 'compareTruckMySuffix');
        comp.compareTruckMySuffix(entity, entity2);
        expect(truckService.compareTruckMySuffix).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
