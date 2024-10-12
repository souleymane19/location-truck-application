import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { ITruckMySuffix } from '../truck-my-suffix.model';

@Component({
  standalone: true,
  selector: 'jhi-truck-my-suffix-detail',
  templateUrl: './truck-my-suffix-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TruckMySuffixDetailComponent {
  truck = input<ITruckMySuffix | null>(null);

  previousState(): void {
    window.history.back();
  }
}
