import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/auth/shared/services/auth.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppSettings} from '../../../config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  error: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  async registerUser(event: FormGroup) {
    const { email, password } = event.value;

    try {
      await this.authService.createUser(email, password);


      const headers = new HttpHeaders()
        .set('Content-Type' , 'application/json');

      const body = {
        email,
        password,
        fullName: email
      };

      this.http.post<any>(AppSettings.API_ENDPOINT + '/api/auth/register', body, { headers })
        .toPromise().then((data: any) => {
         localStorage.setItem('tokenAuth', data.token);
         this.router.navigate(['/']);
        });

    } catch (err) {
      this.error = err.message;
    }
  }

}
