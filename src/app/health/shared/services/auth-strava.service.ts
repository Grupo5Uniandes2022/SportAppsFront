import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthStravaService {
  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isAuthenticated = this.isAuthenticated$.asObservable();

  private token$: BehaviorSubject<string> = new BehaviorSubject(null)
  public token = this.token$.asObservable();

  constructor(
    ) {
      const tokenFromStorage = localStorage.getItem('token');
      if (tokenFromStorage) {
        this.setAuthenticatedUser(tokenFromStorage)
      }
    }

    public initCodeFlow() {
      window.location.href = `${environment.stravaOAuth.loginUrl}?client_id=${environment.stravaOAuth.clientId}&redirect_uri=${environment.stravaOAuth.redirectUri}&scope=${environment.stravaOAuth.scope}&response_type=${environment.stravaOAuth.responseType}`
    }

    public setAuthenticatedUser(token: string) {
      this.isAuthenticated$.next(true)
      localStorage.setItem('token', token)
      this.token$.next(token);
    }

    public clearAuthenticatedUser() {
      this.isAuthenticated$.next(false)
      localStorage.removeItem('token')
      this.token$.next(null)
    }

    public logOut() {
      console.log('logOut')
    }
}
