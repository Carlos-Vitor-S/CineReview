import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ProductionDetailsComponent } from './pages/production-details/production-details.component';
import { ProductionListComponent } from './pages/production-list/production-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'production/:id', component: ProductionDetailsComponent },
  {
    path: 'productionList/:productionType',
    component: ProductionListComponent,
  },
];
