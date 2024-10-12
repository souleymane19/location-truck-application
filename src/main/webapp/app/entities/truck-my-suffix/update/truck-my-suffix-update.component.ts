import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Model } from 'app/entities/enumerations/model.model';
import { ITruckMySuffix } from '../truck-my-suffix.model';
import { TruckMySuffixService } from '../service/truck-my-suffix.service';
import { TruckMySuffixFormGroup, TruckMySuffixFormService } from './truck-my-suffix-form.service';

@Component({
  standalone: true,
  selector: 'jhi-truck-my-suffix-update',
  templateUrl: './truck-my-suffix-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TruckMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  truck: ITruckMySuffix | null = null;
  modelValues = Object.keys(Model);

  protected truckService = inject(TruckMySuffixService);
  protected truckFormService = inject(TruckMySuffixFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TruckMySuffixFormGroup = this.truckFormService.createTruckMySuffixFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ truck }) => {
      this.truck = truck;
      if (truck) {
        this.updateForm(truck);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const truck = this.truckFormService.getTruckMySuffix(this.editForm);
    if (truck.id !== null) {
      this.subscribeToSaveResponse(this.truckService.update(truck));
    } else {
      this.subscribeToSaveResponse(this.truckService.create(truck));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITruckMySuffix>>): void {
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

  protected updateForm(truck: ITruckMySuffix): void {
    this.truck = truck;
    this.truckFormService.resetForm(this.editForm, truck);
  }
}
