import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Service } from '@app/health/shared/services/services.service';
import {AppSettings} from '../../../../config';

@Component({
  selector: 'app-service-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnChanges {

  toggled = false;
  exists = false;

  @Input()
  service: Service;

  @Output()
  create = new EventEmitter<Service>();

  @Output()
  update = new EventEmitter<Service>();

  @Output()
  remove = new EventEmitter<Service>();

  form = this.fb.group({
    name: ['', Validators.required],
    type: ['Otro', Validators.required],
    address: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.service && this.service.name) {
      this.exists = true;

      const value = this.service;
      this.form.patchValue(value);

    }
  }
/*emptyAlergics() {
    while (this.alergics.controls.length) {
      this.alergics.removeAt(0);
    }
  }*/

  get required() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    );
  }

  createService() {
    if (this.form.valid) {
      // tslint:disable-next-line:max-line-length
      const token = localStorage.getItem('tokenAuth');
      const headers = new HttpHeaders()
        .set('Content-Type' , 'application/json')
        .set('Authorization' , 'Bearer ' + token );

      const body = {
        name: this.form.value.name,
        type: this.form.value.type,
        address: this.form.value.address
      };

      this.http.post<any>(AppSettings.API_ENDPOINT + '/api/services', body, { headers })
        .toPromise().then((data: any) => {
        this.router.navigate(['/services']);
      });

    }
  }

  updateService() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeService() {
    this.remove.emit(this.form.value);
  }

  toggle() {
    this.toggled = !this.toggled;
  }

}

