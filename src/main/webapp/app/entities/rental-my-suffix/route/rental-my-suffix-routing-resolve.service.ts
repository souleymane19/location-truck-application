import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRentalMySuffix } from '../rental-my-suffix.model';
import { RentalMySuffixService } from '../service/rental-my-suffix.service';

const rentalResolve = (route: ActivatedRouteSnapshot): Observable<null | IRentalMySuffix> => {
  const id = route.params.id;
  if (id) {
    return inject(RentalMySuffixService)
      .find(id)
      .pipe(
        mergeMap((rental: HttpResponse<IRentalMySuffix>) => {
          if (rental.body) {
            return of(rental.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default rentalResolve;
