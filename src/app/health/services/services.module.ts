import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ServicesRoutingModule } from '@app/health/services/services-routing.module';
import { SharedModule } from '@app/health/shared/shared.module';

import { ServicesComponent } from '@app/health/services/containers/services/services.component';
import { ServiceComponent } from '@app/health/services/containers/service/service.component';

import { ServiceFormComponent } from '@app/health/services/components/service-form/service-form.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ServicesRoutingModule
  ],
  declarations: [
    ServicesComponent,
    ServiceComponent,
    ServiceFormComponent
  ]
})
export class ServicesModule {}
