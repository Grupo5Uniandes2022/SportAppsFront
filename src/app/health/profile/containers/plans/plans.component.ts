import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import {Meal, MealsService} from '../../../shared/services/meals.service';
import {Store} from '../../../../store';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppSettings} from "@app/config";


@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit, OnDestroy {

  meals$: Observable<Meal[]>;
  subscription: Subscription;
  roleStrava: String;
  plan: String;

  constructor(private store: Store,
              private mealsService: MealsService,
              private http: HttpClient) {}

  ngOnInit() {
    this.meals$ = this.store.select<Meal[]>('meals');
    this.subscription = this.mealsService.meals$.subscribe();
    this.roleStrava = this.readLocalStorageValue('token');
    this.getMyPlan();
  }

  readLocalStorageValue(key: string): string {
    return localStorage.getItem(key);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeMeal(event: Meal) {
    this.mealsService.removeMeal(event.key);
  }

  getMyPlan() {
    const token = localStorage.getItem('tokenAuth');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token);

    this.http.get<any>(AppSettings.API_ENDPOINT + '/api/auth/check-status', {headers})
      .toPromise().then((data: any) => {
      this.plan = data.plan;
    });
  }

}
