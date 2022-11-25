import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {ProfileRoutingModule} from './profile-routing.module';
import {PlansComponent} from './containers/plans/plans.component';
import {PlanComponent} from './containers/plan/plan.component';
import { IntegrationsComponent } from './containers/integrations/integrations.component';
import { IntegrationsDetailComponent } from './containers/integrations-detail/integrations-detail.component';
import { StravaIntegrationComponent } from './containers/strava-integration/strava-integration.component';
import { httpInterceptorProviders } from '@app/interceptors/index';
import { ActivityStravaComponent } from './containers/activity-strava/activity-strava.component';
import {SportComponent} from '@app/health/profile/containers/sport/sport.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [
    SportComponent,
    PlansComponent,
    PlanComponent,
    IntegrationsComponent,
    IntegrationsDetailComponent,
    StravaIntegrationComponent,
    ActivityStravaComponent,
  ],
  providers: [
    httpInterceptorProviders
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule {}
