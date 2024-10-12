import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ITruckMySuffix, NewTruckMySuffix } from '../truck-my-suffix.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITruckMySuffix for edit and NewTruckMySuffixFormGroupInput for create.
 */
type TruckMySuffixFormGroupInput = ITruckMySuffix | PartialWithRequiredKeyOf<NewTruckMySuffix>;

type TruckMySuffixFormDefaults = Pick<NewTruckMySuffix, 'id'>;

type TruckMySuffixFormGroupContent = {
  id: FormControl<ITruckMySuffix['id'] | NewTruckMySuffix['id']>;
  regionName: FormControl<ITruckMySuffix['regionName']>;
  licensePlate: FormControl<ITruckMySuffix['licensePlate']>;
  imageUrl: FormControl<ITruckMySuffix['imageUrl']>;
  model: FormControl<ITruckMySuffix['model']>;
};

export type TruckMySuffixFormGroup = FormGroup<TruckMySuffixFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TruckMySuffixFormService {
  createTruckMySuffixFormGroup(truck: TruckMySuffixFormGroupInput = { id: null }): TruckMySuffixFormGroup {
    const truckRawValue = {
      ...this.getFormDefaults(),
      ...truck,
    };
    return new FormGroup<TruckMySuffixFormGroupContent>({
      id: new FormControl(
        { value: truckRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      regionName: new FormControl(truckRawValue.regionName),
      licensePlate: new FormControl(truckRawValue.licensePlate),
      imageUrl: new FormControl(truckRawValue.imageUrl),
      model: new FormControl(truckRawValue.model),
    });
  }

  getTruckMySuffix(form: TruckMySuffixFormGroup): ITruckMySuffix | NewTruckMySuffix {
    return form.getRawValue() as ITruckMySuffix | NewTruckMySuffix;
  }

  resetForm(form: TruckMySuffixFormGroup, truck: TruckMySuffixFormGroupInput): void {
    const truckRawValue = { ...this.getFormDefaults(), ...truck };
    form.reset(
      {
        ...truckRawValue,
        id: { value: truckRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TruckMySuffixFormDefaults {
    return {
      id: null,
    };
  }
}
