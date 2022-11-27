import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from '@app/auth/shared/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@app/store';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should ...', inject([Router, Store, AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
