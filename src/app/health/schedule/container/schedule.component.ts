import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { ScheduleItem, ScheduleService } from '@app/health/shared/services/schedule.service';
import { Meal, MealsService } from '@app/health/shared/services/meals.service';
import { Workout, WorkoutsService } from '@app/health/shared/services/workouts.service';

import { Store } from '@app/store';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppSettings} from '../../../config';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  open = false;

  date$: Observable<Date>;
  selected$: Observable<any>;
  list$: null;
  services: null;
  subscriptions: Subscription[] = [];
  schedule$: Observable<ScheduleItem[]>;

  constructor(
    private store: Store,
    private scheduleService: ScheduleService,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.date$ = this.store.select('date');
     this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.getListEvents('training');
    this.getListService('');
    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe(),
      this.mealsService.meals$.subscribe(),
      this.workoutsService.workouts$.subscribe(),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  assignItem(items: string[]) {
    this.scheduleService.updateItems(items);
    this.closeAssign();
  }

  closeAssign() {
    this.open = false;
  }

  getListEvents(type : string) {
    const token = localStorage.getItem('tokenAuth');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token);

    this.http.get<any>(AppSettings.API_ENDPOINT + '/api/events', {headers})
      .toPromise().then((data: any) => {
      // data = data.filter(element => element.type.toString().toLowerCase().includes(type));
      this.list$ = data;
    });
  }

  getListService(type : string) {
    const token = localStorage.getItem('tokenAuth');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token);

    this.http.get<any>(AppSettings.API_ENDPOINT + '/api/services', {headers})
      .toPromise().then((data: any) => {
      // data = data.filter(element => element.type.toString().toLowerCase().includes(type));
      console.log(data);
      this.services = data;
    });
  }

}
