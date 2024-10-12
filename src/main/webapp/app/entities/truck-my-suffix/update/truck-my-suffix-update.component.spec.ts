import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { TruckMySuffixService } from '../service/truck-my-suffix.service';
import { ITruckMySuffix } from '../truck-my-suffix.model';
import { TruckMySuffixFormService } from './truck-my-suffix-form.service';

import { TruckMySuffixUpdateComponent } from './truck-my-suffix-update.component';

describe('TruckMySuffix Management Update Component', () => {
  let comp: TruckMySuffixUpdateComponent;
  let fixture: ComponentFixture<TruckMySuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let truckFormService: TruckMySuffixFormService;
  let truckService: TruckMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TruckMySuffixUpdateComponent],
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
      .overrideTemplate(TruckMySuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TruckMySuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    truckFormService = TestBed.inject(TruckMySuffixFormService);
    truckService = TestBed.inject(TruckMySuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const truck: ITruckMySuffix = { id: 456 };

      activatedRoute.data = of({ truck });
      comp.ngOnInit();

      expect(comp.truck).toEqual(truck);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITruckMySuffix>>();
      const truck = { id: 123 };
      jest.spyOn(truckFormService, 'getTruckMySuffix').mockReturnValue(truck);
      jest.spyOn(truckService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ truck });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: truck }));
      saveSubject.complete();

      // THEN
      expect(truckFormService.getTruckMySuffix).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(truckService.update).toHaveBeenCalledWith(expect.objectContaining(truck));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITruckMySuffix>>();
      const truck = { id: 123 };
      jest.spyOn(truckFormService, 'getTruckMySuffix').mockReturnValue({ id: null });
      jest.spyOn(truckService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ truck: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: truck }));
      saveSubject.complete();

      // THEN
      expect(truckFormService.getTruckMySuffix).toHaveBeenCalled();
      expect(truckService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITruckMySuffix>>();
      const truck = { id: 123 };
      jest.spyOn(truckService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ truck });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(truckService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
