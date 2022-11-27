import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityStravaComponent } from './activity-strava.component';

describe('ActivityStravaComponent', () => {
  let component: ActivityStravaComponent;
  let fixture: ComponentFixture<ActivityStravaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityStravaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityStravaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
