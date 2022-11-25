import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AuthModule } from '@app/auth/auth.module';
import { HealthModule } from '@app/health/health.module';

import { AppComponent } from '@app/root/container/app.component';
import { HeaderComponent } from '@app/root/components/header/header.component';
import { NavbarComponent } from '@app/root/components/navbar/navbar.component';

import { Store } from '@app/store';

import { AppRoutingModule } from '@app/app-routing.module';
import { WebComponent } from './web/web.component';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from '../app/interceptors/index';
import { NavbarAdminComponent } from '@app/root/components/navbar-admin/navbar-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    NavbarAdminComponent,
    WebComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HealthModule,
    HttpClientModule,
  ],
  providers: [
    Store,
    httpInterceptorProviders
  ],
  bootstrap: [ AppComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
