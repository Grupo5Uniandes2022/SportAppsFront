import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StravaService } from '../../../shared/services/strava.service';
import { AuthStravaService } from '../../../shared/services/auth-strava.service';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-strava-integration',
  templateUrl: './strava-integration.component.html',
  styleUrls: ['./strava-integration.component.scss']
})
export class StravaIntegrationComponent implements OnInit {

  constructor(
    private authService: AuthStravaService,
    private stravaService: StravaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((d) => {
      if (d.code) {
        this.stravaService.authenticateAthlete(d.code).subscribe(
          (t) => {
            if (t.access_token) {
              this.authService.setAuthenticatedUser(t.access_token);
              this.router.navigate(['profile'])
            }
          }
        )
      }
    })
  }

  ngOnInit(): void {
  }

  initCodeFlow() {
    this.authService.initCodeFlow();
  }

}
