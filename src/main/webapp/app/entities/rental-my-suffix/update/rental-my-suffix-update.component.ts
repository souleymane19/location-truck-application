import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITruckMySuffix } from 'app/entities/truck-my-suffix/truck-my-suffix.model';
import { TruckMySuffixService } from 'app/entities/truck-my-suffix/service/truck-my-suffix.service';
import { IRentalMySuffix } from '../rental-my-suffix.model';
import { RentalMySuffixService } from '../service/rental-my-suffix.service';
import { RentalMySuffixFormGroup, RentalMySuffixFormService } from './rental-my-suffix-form.service';

@Component({
  standalone: true,
  selector: 'jhi-rental-my-suffix-update',
  templateUrl: './rental-my-suffix-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class RentalMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  rental: IRentalMySuffix | null = null;

  trucksSharedCollection: ITruckMySuffix[] = [];

  protected rentalService = inject(RentalMySuffixService);
  protected rentalFormService = inject(RentalMySuffixFormService);
  protected truckService = inject(TruckMySuffixService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: RentalMySuffixFormGroup = this.rentalFormService.createRentalMySuffixFormGroup();

  compareTruckMySuffix = (o1: ITruckMySuffix | null, o2: ITruckMySuffix | null): boolean => this.truckService.compareTruckMySuffix(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rental }) => {
      this.rental = rental;
      if (rental) {
        this.updateForm(rental);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rental = this.rentalFormService.getRentalMySuffix(this.editForm);
    if (rental.id !== null) {
      this.subscribeToSaveResponse(this.rentalService.update(rental));
    } else {
      this.subscribeToSaveResponse(this.rentalService.create(rental));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRentalMySuffix>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(rental: IRentalMySuffix): void {
    this.rental = rental;
    this.rentalFormService.resetForm(this.editForm, rental);

    this.trucksSharedCollection = this.truckService.addTruckMySuffixToCollectionIfMissing<ITruckMySuffix>(
      this.trucksSharedCollection,
      rental.rentals,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.truckService
      .query()
      .pipe(map((res: HttpResponse<ITruckMySuffix[]>) => res.body ?? []))
      .pipe(
        map((trucks: ITruckMySuffix[]) =>
          this.truckService.addTruckMySuffixToCollectionIfMissing<ITruckMySuffix>(trucks, this.rental?.rentals),
        ),
      )
      .subscribe((trucks: ITruckMySuffix[]) => (this.trucksSharedCollection = trucks));
  }
}
