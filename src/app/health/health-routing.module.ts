import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@app/auth/shared/guards/auth.guard';


export const ROUTES: Routes = [
  {
    path: 'schedule',
    canActivate: [AuthGuard],
    loadChildren: './schedule/schedule.module#ScheduleModule'
  },
  {
    path: 'meals',
    canActivate: [AuthGuard],
    loadChildren: './meals/meals.module#MealsModule'
  },
  {
    path: 'services',
    canActivate: [AuthGuard],
    loadChildren: './services/services.module#ServicesModule'
  },
  {
    path: 'workouts',
    canActivate: [AuthGuard],
    loadChildren: './workouts/workouts.module#WorkoutsModule'
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: './profile/profile.module#ProfileModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class HealthRoutingModule {}
