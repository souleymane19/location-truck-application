import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITruckMySuffix } from '../truck-my-suffix.model';
import { TruckMySuffixService } from '../service/truck-my-suffix.service';

@Component({
  standalone: true,
  templateUrl: './truck-my-suffix-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TruckMySuffixDeleteDialogComponent {
  truck?: ITruckMySuffix;

  protected truckService = inject(TruckMySuffixService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.truckService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
