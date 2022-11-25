import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription, throwError } from 'rxjs';

import { Store } from '@app/store';
import { Service } from '@app/models/supplier.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {AppSettings} from '../../../../config';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy {

  services$: Observable<Service[]>;
  //subscription: Subscription;

  constructor(private store: Store,
              private http: HttpClient) {}

  ngOnInit() {
    this.services$ = this.getServicesSupplier();
  }

  private getServicesSupplier(): Observable<Service[]>{
    const token = localStorage.getItem('tokenAuth');
      const headers = new HttpHeaders()
        .set('Content-Type' , 'application/json')
        .set('Authorization' , 'Bearer ' + token );

      return this.http.get<any>(AppSettings.API_ENDPOINT + '/api/services/by-supplier', { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

  removeService(event: Service) {
    const token = localStorage.getItem('tokenAuth');
      const headers = new HttpHeaders()
        .set('Content-Type' , 'application/json')
        .set('Authorization' , 'Bearer ' + token );

      return this.http.get<any>(AppSettings.API_ENDPOINT + '/api/services/' + event.id, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

}
