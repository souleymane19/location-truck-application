import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IRentalMySuffix } from '../rental-my-suffix.model';
import { RentalMySuffixService } from '../service/rental-my-suffix.service';

@Component({
  standalone: true,
  templateUrl: './rental-my-suffix-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class RentalMySuffixDeleteDialogComponent {
  rental?: IRentalMySuffix;

  protected rentalService = inject(RentalMySuffixService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.rentalService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
