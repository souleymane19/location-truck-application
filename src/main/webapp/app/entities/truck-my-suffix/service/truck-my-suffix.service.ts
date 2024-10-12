import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITruckMySuffix, NewTruckMySuffix } from '../truck-my-suffix.model';

export type PartialUpdateTruckMySuffix = Partial<ITruckMySuffix> & Pick<ITruckMySuffix, 'id'>;

export type EntityResponseType = HttpResponse<ITruckMySuffix>;
export type EntityArrayResponseType = HttpResponse<ITruckMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TruckMySuffixService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/trucks');

  create(truck: NewTruckMySuffix): Observable<EntityResponseType> {
    return this.http.post<ITruckMySuffix>(this.resourceUrl, truck, { observe: 'response' });
  }

  update(truck: ITruckMySuffix): Observable<EntityResponseType> {
    return this.http.put<ITruckMySuffix>(`${this.resourceUrl}/${this.getTruckMySuffixIdentifier(truck)}`, truck, { observe: 'response' });
  }

  partialUpdate(truck: PartialUpdateTruckMySuffix): Observable<EntityResponseType> {
    return this.http.patch<ITruckMySuffix>(`${this.resourceUrl}/${this.getTruckMySuffixIdentifier(truck)}`, truck, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITruckMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITruckMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTruckMySuffixIdentifier(truck: Pick<ITruckMySuffix, 'id'>): number {
    return truck.id;
  }

  compareTruckMySuffix(o1: Pick<ITruckMySuffix, 'id'> | null, o2: Pick<ITruckMySuffix, 'id'> | null): boolean {
    return o1 && o2 ? this.getTruckMySuffixIdentifier(o1) === this.getTruckMySuffixIdentifier(o2) : o1 === o2;
  }

  addTruckMySuffixToCollectionIfMissing<Type extends Pick<ITruckMySuffix, 'id'>>(
    truckCollection: Type[],
    ...trucksToCheck: (Type | null | undefined)[]
  ): Type[] {
    const trucks: Type[] = trucksToCheck.filter(isPresent);
    if (trucks.length > 0) {
      const truckCollectionIdentifiers = truckCollection.map(truckItem => this.getTruckMySuffixIdentifier(truckItem));
      const trucksToAdd = trucks.filter(truckItem => {
        const truckIdentifier = this.getTruckMySuffixIdentifier(truckItem);
        if (truckCollectionIdentifiers.includes(truckIdentifier)) {
          return false;
        }
        truckCollectionIdentifiers.push(truckIdentifier);
        return true;
      });
      return [...trucksToAdd, ...truckCollection];
    }
    return truckCollection;
  }
}
