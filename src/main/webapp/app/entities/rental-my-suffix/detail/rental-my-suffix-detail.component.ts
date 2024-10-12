import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IRentalMySuffix } from '../rental-my-suffix.model';

@Component({
  standalone: true,
  selector: 'jhi-rental-my-suffix-detail',
  templateUrl: './rental-my-suffix-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class RentalMySuffixDetailComponent {
  rental = input<IRentalMySuffix | null>(null);

  previousState(): void {
    window.history.back();
  }
}
