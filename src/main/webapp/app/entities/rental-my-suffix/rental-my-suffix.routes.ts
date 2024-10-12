import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import RentalMySuffixResolve from './route/rental-my-suffix-routing-resolve.service';

const rentalRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/rental-my-suffix.component').then(m => m.RentalMySuffixComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/rental-my-suffix-detail.component').then(m => m.RentalMySuffixDetailComponent),
    resolve: {
      rental: RentalMySuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/rental-my-suffix-update.component').then(m => m.RentalMySuffixUpdateComponent),
    resolve: {
      rental: RentalMySuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/rental-my-suffix-update.component').then(m => m.RentalMySuffixUpdateComponent),
    resolve: {
      rental: RentalMySuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default rentalRoute;
