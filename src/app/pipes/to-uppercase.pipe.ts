import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toUppercase',
})
export class ToUppercasePipe implements PipeTransform {

  transform(value: any): any {
    if (typeof value === 'string') {
      return value.toUpperCase();
    }
    return value;
  }
}
