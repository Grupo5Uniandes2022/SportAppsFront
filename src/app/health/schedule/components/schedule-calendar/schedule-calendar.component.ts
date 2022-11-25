import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { ScheduleItem, ScheduleList } from '@app/health/shared/services/schedule.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppSettings} from '../../../../config';

@Component({
  selector: 'app-schedule-calendar',
  styleUrls: ['schedule-calendar.component.scss'],
  templateUrl: './schedule-calendar.component.html'
})
export class ScheduleCalendarComponent implements OnChanges {

  @Input()
  set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
  }

  @Input()
  items: ScheduleList;

  @Output()
  change = new EventEmitter<Date>();

  @Output()
  select = new EventEmitter<any>();

  sections = [
    { key: 'morning', name: 'Eventos' },
  ];

  selectedDayIndex: number;
  selectedDay: Date;
  selectedWeek: Date;


  events$ = null;

  constructor( private http: HttpClient  ) { }

  ngOnInit() {
    const typeEvent = 'training';
    this.getWorkouts(typeEvent);
  }

  ngOnChanges() {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }


  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  onChange(weekOffset: number) {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = (
      new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
    );
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    this.change.emit(startDate);
  }

  getSection(name: string): ScheduleItem {
    return this.items && this.items[name] || {};
  }

  selectSection({ type, assigned, data }: any, section: string) {
    const day = this.selectedDay;

    this.select.emit({
      type,
      assigned,
      section,
      day,
      data
    });
  }

  private getToday(date: Date) {
    let today = date.getDay() - 1;
    if (today < 0) {
      today = 6;
    }
    return today;
  }

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }


  private getWorkouts(typeEvent: string) {
    const token = localStorage.getItem('tokenAuth');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token);

    this.http.get<any>(AppSettings.API_ENDPOINT + '/api/events', {headers})
      .toPromise().then((data: any) => {
      //data = data.filter(element => element.type.toString().toLowerCase().includes(typeEvent));
      console.log(data);
      this.events$ = data;
    });
  }

}
