import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServicesComponent } from '@app/health/services/containers/services/services.component';
import { ServiceComponent } from '@app/health/services/containers/service/service.component';


export const ROUTES: Routes = [
  { path: '', component: ServicesComponent },
  { path: 'new', component: ServiceComponent },
  { path: ':id', component: ServiceComponent }
];


@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [ RouterModule ]
})
export class ServicesRoutingModule {}
