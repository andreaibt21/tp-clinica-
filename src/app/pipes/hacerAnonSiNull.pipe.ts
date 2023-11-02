import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'HacerAnonSiNull'
})
export class HacerAnonSiNullPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    var output;
    value == null ? output = 'Anónimo' : output = value;
    return output;
  }

}
