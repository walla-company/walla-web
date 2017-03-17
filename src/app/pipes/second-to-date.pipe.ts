import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondToDate'
})
export class SecondToDatePipe implements PipeTransform {
  
  transform(seconds: number): Date {
      return new Date(seconds * 1000);
  }

}
