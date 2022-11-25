import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Service, ServicesService } from '@app/health/shared/services/services.service';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['service.component.scss'],
})
export class ServiceComponent implements OnInit, OnDestroy {

  service$: Observable<Service>;
  subscription: Subscription;

  constructor(
    private servicesService: ServicesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.servicesService.services$.subscribe();

    this.service$ = this.route.params
      .pipe(switchMap(param => this.servicesService.getService(param.id)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async addService(event: Service) {
    await this.servicesService.addService(event);
    this.backToServices();
  }

  async updateService(event: Service) {
    const key = this.route.snapshot.params.id;
    await this.servicesService.updateService(key, event);
    this.backToServices();
  }

  async removeService(event: Service) {
    const key = this.route.snapshot.params.id;
    await this.servicesService.removeService(key);
    this.backToServices();
  }

  backToServices() {
    this.router.navigate(['services']);
  }


}
