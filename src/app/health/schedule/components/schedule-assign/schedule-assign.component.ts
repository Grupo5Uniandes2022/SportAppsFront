import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Meal } from '@app/health/shared/services/meals.service';
import { Workout } from '@app/health/shared/services/workouts.service';
import { DatePipe } from '@angular/common';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppSettings} from '../../../../config';
import {Router} from "@angular/router";

@Component({
  selector: 'app-schedule-assign',
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleAssignComponent implements OnInit {

  private selected: string[] = [];

  @Input()
  section: any;

  @Input()
  list: null;

  @Input()
  services: null;

  @Input()
  date: Date;

  @Output()
  update = new EventEmitter<any>();

  @Output()
  cancel = new EventEmitter<any>();

  constructor(private datePipe: DatePipe, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.selected = []; // [...this.section.assigned];
  }

  toggleItem(id: string) {
    if (this.exists(id)) {
      this.selected = this.selected.filter(item => item !== id);
    } else {
      this.selected = [...this.selected, id];
    }
  }

  getRoute(name: string) {
    return [`../${name}/new`];
  }

  exists(item: any) {
    return !!~this.selected.indexOf(item.id);
    //return item.startDate !== '2016-09-18T17:34:02.666Z';
  }

  updateAssign(type: string, services: any, trainings: any) {
    console.log(this.selected);
    // tslint:disable-next-line:max-line-length
    const token = localStorage.getItem('tokenAuth');
    const headers = new HttpHeaders()
      .set('Content-Type' , 'application/json')
      .set('Authorization' , 'Bearer ' + token );

    if (type === 'workouts') {

      const item = trainings.filter(element => element.id.toString().toLowerCase().includes(this.selected[0]));

      const body = {
        startDate:  this.datePipe.transform(this.date, 'yyyy-MM-dd'),
        endDate:  this.datePipe.transform(this.date, 'yyyy-MM-dd'),
        distance: item[0].distance,
        duration: item[0].duration
      };

      this.http.put<any>(AppSettings.API_ENDPOINT + '/api/events/' + this.selected[0], body, {headers})
        .toPromise().then((data: any) => {
          window.location.reload();
      });
    } else {


      const item = services.filter(element => element.id.toString().toLowerCase().includes(this.selected[0]));
      const body = {
        startDate: this.datePipe.transform(this.date, 'yyyy-MM-dd'),
        endDate: this.datePipe.transform(this.date, 'yyyy-MM-dd'),
        title: 'Cita - ' + item[0].name,
        type: 'appointment'
      };

      this.http.post<any>(AppSettings.API_ENDPOINT + '/api/events', body, { headers })
        .toPromise().then((data: any) => {
        window.location.reload();
      });


    }
  }

  cancelAssign() {
    this.cancel.emit();
  }

  getEventsFromSection(list: any, type: string ) {
      if (type === 'workouts') {
        return list.filter(item => item.type === 'training');
      } else {
        return list.filter(item => item.type === 'appointment');
      }
  }

}
