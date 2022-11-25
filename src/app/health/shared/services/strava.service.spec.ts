/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { StravaService } from './strava.service';

describe('Service: Strava', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StravaService]
    });
  });

  it('should ...', inject([StravaService], (service: StravaService) => {
    expect(service).toBeTruthy();
  }));
});
