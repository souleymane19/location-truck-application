import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'locationTruckApplicationApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'truck-my-suffix',
    data: { pageTitle: 'locationTruckApplicationApp.truck.home.title' },
    loadChildren: () => import('./truck-my-suffix/truck-my-suffix.routes'),
  },
  {
    path: 'rental-my-suffix',
    data: { pageTitle: 'locationTruckApplicationApp.rental.home.title' },
    loadChildren: () => import('./rental-my-suffix/rental-my-suffix.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
