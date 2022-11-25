import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {
  }

  transform(value: any, type: string, date: Date) {
    let info = '';
    const calendarDay =  this.datePipe.transform(date, 'yyyy-MM-dd');
    for(let i = 0; i < value.length; i++) {
      const eventDay =  this.datePipe.transform(value[i].startDate, 'yyyy-MM-dd');
      if (value[i].startDate !== '2016-09-18T17:34:02.666Z' && value[i].type === type && calendarDay === eventDay) {
        info = info +  ', ' + value[i].title;
      }
    }
    if (info === '') {
      return 'Programar ' + (type === 'training' ? 'Entrenamiento' : 'Servicio');
    } else {
      return info.substr(1);
    }
  }

}
