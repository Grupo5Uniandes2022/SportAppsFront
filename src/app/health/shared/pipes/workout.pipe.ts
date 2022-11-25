import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workout'
})
export class WorkoutPipe implements PipeTransform {

  transform(value: any) {
    return `Distancia: ${value.distance + 'km'}, Duración: ${value.duration + 'mins'}`;
  }

}
