import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IRentalMySuffix, NewRentalMySuffix } from '../rental-my-suffix.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRentalMySuffix for edit and NewRentalMySuffixFormGroupInput for create.
 */
type RentalMySuffixFormGroupInput = IRentalMySuffix | PartialWithRequiredKeyOf<NewRentalMySuffix>;

type RentalMySuffixFormDefaults = Pick<NewRentalMySuffix, 'id'>;

type RentalMySuffixFormGroupContent = {
  id: FormControl<IRentalMySuffix['id'] | NewRentalMySuffix['id']>;
  streetAddress: FormControl<IRentalMySuffix['streetAddress']>;
  postalCode: FormControl<IRentalMySuffix['postalCode']>;
  city: FormControl<IRentalMySuffix['city']>;
  stateProvince: FormControl<IRentalMySuffix['stateProvince']>;
  rentals: FormControl<IRentalMySuffix['rentals']>;
};

export type RentalMySuffixFormGroup = FormGroup<RentalMySuffixFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RentalMySuffixFormService {
  createRentalMySuffixFormGroup(rental: RentalMySuffixFormGroupInput = { id: null }): RentalMySuffixFormGroup {
    const rentalRawValue = {
      ...this.getFormDefaults(),
      ...rental,
    };
    return new FormGroup<RentalMySuffixFormGroupContent>({
      id: new FormControl(
        { value: rentalRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      streetAddress: new FormControl(rentalRawValue.streetAddress),
      postalCode: new FormControl(rentalRawValue.postalCode),
      city: new FormControl(rentalRawValue.city),
      stateProvince: new FormControl(rentalRawValue.stateProvince),
      rentals: new FormControl(rentalRawValue.rentals),
    });
  }

  getRentalMySuffix(form: RentalMySuffixFormGroup): IRentalMySuffix | NewRentalMySuffix {
    return form.getRawValue() as IRentalMySuffix | NewRentalMySuffix;
  }

  resetForm(form: RentalMySuffixFormGroup, rental: RentalMySuffixFormGroupInput): void {
    const rentalRawValue = { ...this.getFormDefaults(), ...rental };
    form.reset(
      {
        ...rentalRawValue,
        id: { value: rentalRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): RentalMySuffixFormDefaults {
    return {
      id: null,
    };
  }
}
