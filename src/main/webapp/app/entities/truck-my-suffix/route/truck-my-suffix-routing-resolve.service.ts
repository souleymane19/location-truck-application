import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITruckMySuffix } from '../truck-my-suffix.model';
import { TruckMySuffixService } from '../service/truck-my-suffix.service';

const truckResolve = (route: ActivatedRouteSnapshot): Observable<null | ITruckMySuffix> => {
  const id = route.params.id;
  if (id) {
    return inject(TruckMySuffixService)
      .find(id)
      .pipe(
        mergeMap((truck: HttpResponse<ITruckMySuffix>) => {
          if (truck.body) {
            return of(truck.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default truckResolve;
