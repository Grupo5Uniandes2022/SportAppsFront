import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aliments'
})
export class AlimentsPipe implements PipeTransform {

  transform(value: any) {
    return Array.isArray(value) ? value.join(', ') : value;
  }

}
