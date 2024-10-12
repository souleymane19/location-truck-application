import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRentalMySuffix, NewRentalMySuffix } from '../rental-my-suffix.model';

export type PartialUpdateRentalMySuffix = Partial<IRentalMySuffix> & Pick<IRentalMySuffix, 'id'>;

export type EntityResponseType = HttpResponse<IRentalMySuffix>;
export type EntityArrayResponseType = HttpResponse<IRentalMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class RentalMySuffixService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/rentals');

  create(rental: NewRentalMySuffix): Observable<EntityResponseType> {
    return this.http.post<IRentalMySuffix>(this.resourceUrl, rental, { observe: 'response' });
  }

  update(rental: IRentalMySuffix): Observable<EntityResponseType> {
    return this.http.put<IRentalMySuffix>(`${this.resourceUrl}/${this.getRentalMySuffixIdentifier(rental)}`, rental, {
      observe: 'response',
    });
  }

  partialUpdate(rental: PartialUpdateRentalMySuffix): Observable<EntityResponseType> {
    return this.http.patch<IRentalMySuffix>(`${this.resourceUrl}/${this.getRentalMySuffixIdentifier(rental)}`, rental, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRentalMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRentalMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getRentalMySuffixIdentifier(rental: Pick<IRentalMySuffix, 'id'>): number {
    return rental.id;
  }

  compareRentalMySuffix(o1: Pick<IRentalMySuffix, 'id'> | null, o2: Pick<IRentalMySuffix, 'id'> | null): boolean {
    return o1 && o2 ? this.getRentalMySuffixIdentifier(o1) === this.getRentalMySuffixIdentifier(o2) : o1 === o2;
  }

  addRentalMySuffixToCollectionIfMissing<Type extends Pick<IRentalMySuffix, 'id'>>(
    rentalCollection: Type[],
    ...rentalsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const rentals: Type[] = rentalsToCheck.filter(isPresent);
    if (rentals.length > 0) {
      const rentalCollectionIdentifiers = rentalCollection.map(rentalItem => this.getRentalMySuffixIdentifier(rentalItem));
      const rentalsToAdd = rentals.filter(rentalItem => {
        const rentalIdentifier = this.getRentalMySuffixIdentifier(rentalItem);
        if (rentalCollectionIdentifiers.includes(rentalIdentifier)) {
          return false;
        }
        rentalCollectionIdentifiers.push(rentalIdentifier);
        return true;
      });
      return [...rentalsToAdd, ...rentalCollection];
    }
    return rentalCollection;
  }
}
