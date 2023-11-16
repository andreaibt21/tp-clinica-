import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from 'src/app/clases/turno';


@Pipe({
  name: 'nombreEsptaturno'
})
export class NombreEsptaTurnoPipe implements PipeTransform {

  transform(value: Turno, args?: any): any {
    return `Especialista: ${value.esptaNombre} ${value.esptaApellido}`;
  }

}
