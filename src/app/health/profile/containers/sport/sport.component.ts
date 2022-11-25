import { Component, OnInit, OnDestroy } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppSettings} from "@app/config";


@Component({
  selector: 'app-plans',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.scss']
})
export class SportComponent implements OnInit, OnDestroy {

  data: any;

  form = this.fb.group({
    edad: 0,
    peso: 0,
    imc: 0
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.getSportData();
  }

  ngOnDestroy() {
  }

  saveSportData() {

    const token = localStorage.getItem('tokenAuth');
    const headers = new HttpHeaders()
      .set('Content-Type' , 'application/json')
      .set('Authorization' , 'Bearer ' + token );

    const body = this.form.value;
    console.log(body);

    this.http.post<any>(AppSettings.API_ENDPOINT + '/api/auth/sport', body, { headers })
      .toPromise().then((data: any) => {
      this.router.navigate(['/profile']);
    });
  }

  getSportData() {
    const token = localStorage.getItem('tokenAuth');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token);

    this.http.get<any>(AppSettings.API_ENDPOINT + '/api/auth/check-status', {headers})
      .toPromise().then((data: any) => {
      this.data = data;
    });
  }


}
