import {Component, OnInit, OnDestroy} from '@angular/core';

import {Store} from '@app/store';

import {Observable, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Workout, WorkoutsService} from '@app/health/shared/services/workouts.service';
import {AppSettings} from '../../../../config';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit, OnDestroy {

   workouts$: Observable<Workout[]>;
  //subscription: Subscription;

  constructor(
    private http: HttpClient
    //private store: Store,
    //private workoutsService: WorkoutsService
  ) {
  }

  ngOnInit() {
    this.getWorkouts();
    //this.workouts$ = this.store.select<Workout[]>('workouts');
    //this.subscription = this.workoutsService.workouts$.subscribe();
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

  removeWorkout(event: Workout) {
    //this.workoutsService.removeWorkout(event.key);
  }

  getWorkouts() {
    const token = localStorage.getItem('tokenAuth');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token);

    this.http.get<any>(AppSettings.API_ENDPOINT + '/api/events', {headers})
      .toPromise().then((data: any) => {
        data = data.filter(element => element.type.toString().toLowerCase().includes('training'));
        this.workouts$ = data;
    });
  }

}
