import { Component, OnInit } from '@angular/core';
import { StravaService } from '../../../shared/services/strava.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, first, map, retry } from 'rxjs/operators';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.css']
})
export class IntegrationsComponent implements OnInit {
  public data$: Observable<any>;
  public activities$: Observable<any>;

  constructor(
    private stravaService: StravaService
  ) {
    this.data$ = this.stravaService.getAuthenticatedAthlete().pipe(
      retry(2),
      concatMap((athlete) => {
        return this.stravaService.getAthleteStats(athlete.id).pipe(
          retry(2),
          map((stats) => {
            return {athlete, stats }
          }),
          catchError((error) => {
            return of({ athlete, error })
          })
        )
      }),
      catchError((e) => {
        return throwError(e)
      })
    )
    this.activities$ = this.stravaService.getActivities().pipe(
      retry(2),
      map((res) => res.slice(0, 10)),
      catchError((e) => {
        return throwError(e)
      })
    )
  }

  ngOnInit() {
  }

}
