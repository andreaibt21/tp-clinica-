import { UpperCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Horario } from 'src/app/clases/horario';


@Pipe({
  name: 'horariosespta'
})
export class HorariosEsptaPipe implements PipeTransform {

  constructor(private up: UpperCasePipe) {}
  
  transform(value: Horario , args?: any): string {
    return this.up.transform(value.diaSemana)+` -- Desde: ${value.horaDesde} - Hasta: ${value.horaHasta}`;
  }

}
