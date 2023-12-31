import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from 'src/app/clases/turno';

@Pipe({
  name: 'fechahoraturno'
})
export class FechaHoraTurnoPipe implements PipeTransform {

  transform(value: Turno, args?: any): any {

      let retorno = value.dia.split("2023-")
    let fecha =retorno[1]



    var diaSemana = '';
    switch(value.diaSemana){
      case 'lunes':
        diaSemana = 'L';
        break
      case 'martes':
        diaSemana = 'M';
        break
      case 'miércoles':
        diaSemana = 'X';
        break
      case 'jueves':
        diaSemana = 'J';
        break
      case 'viernes':
        diaSemana = 'V';
        break
      case 'sábado':
        diaSemana = 'S';
        break
      case 'domingo':
        diaSemana = 'D';
        break
      default:
        diaSemana = '?';
    }
    return ` ${fecha} -  ${value.hora}`;
  }

}
