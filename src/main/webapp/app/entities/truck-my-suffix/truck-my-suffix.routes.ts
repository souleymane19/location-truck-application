import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import TruckMySuffixResolve from './route/truck-my-suffix-routing-resolve.service';

const truckRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/truck-my-suffix.component').then(m => m.TruckMySuffixComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/truck-my-suffix-detail.component').then(m => m.TruckMySuffixDetailComponent),
    resolve: {
      truck: TruckMySuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/truck-my-suffix-update.component').then(m => m.TruckMySuffixUpdateComponent),
    resolve: {
      truck: TruckMySuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/truck-my-suffix-update.component').then(m => m.TruckMySuffixUpdateComponent),
    resolve: {
      truck: TruckMySuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default truckRoute;
