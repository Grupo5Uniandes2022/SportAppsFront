import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Meal, MealsService } from '@app/health/shared/services/meals.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppSettings} from "@app/config";


@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['plan.component.scss'],
})
export class PlanComponent implements OnInit, OnDestroy {

  meal$: Observable<Meal>;
  subscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.subscription = this.mealsService.meals$.subscribe();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.meal$ = this.route.params
      .pipe(switchMap(param => this.mealsService.getMeal(param.id)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async addMeal(event: Meal) {
    await this.mealsService.addMeal(event);
    this.backToMeals();
  }

  async updateMeal(event: Meal) {
    const key = this.route.snapshot.params.id;
    await this.mealsService.updateMeal(key, event);
    this.backToMeals();
  }

  async removeMeal(event: Meal) {
    const key = this.route.snapshot.params.id;
    await this.mealsService.removeMeal(key);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }

  updatePlan(plan: string) {
    const token = localStorage.getItem('tokenAuth');
    const headers = new HttpHeaders()
      .set('Content-Type' , 'application/json')
      .set('Authorization' , 'Bearer ' + token );

    const body = { plan };

    this.http.post<any>(AppSettings.API_ENDPOINT + '/api/auth/plan', body, { headers })
      .toPromise().then((data: any) => {
      this.router.navigate(['/profile']).then(() => {
        window.location.reload();
      });
    });

  }


}
