import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Turno } from 'src/app/clases/turno';
import { StorageService } from 'src/app/services/storage.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class FinalizarTurnoService {

  constructor(public st: StorageService, public alert: AlertService) { }


  async finalizarTurno(turno: any){
    var retorno = false;
    const { value: text } = await Swal.fire({
      title: 'Finalizar',
      input: 'textarea',
      inputLabel: 'Añada una reseña',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#198754',
      confirmButtonText: 'Finalizar Turno',
      cancelButtonText: 'Volver',
      // inputPlaceholder: 'Introduzca el motivo de cancelación',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    });

    if (text) {
      this.st.cambiarEstadoTurno(turno,'finalizar', text);
      retorno = true;
    }
    else
    {
      this.alert.lanzarAlertaError("El turno finalizó pero no grabó ninguna reseña.")
    }
    return retorno;
    }


  async reseniarTurno(turno: any){
    var retorno = false;
    const { value: text } = await Swal.fire({
      title: 'Finalizar',
      input: 'textarea',
      inputLabel: 'Añada una reseña',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#198754',
      confirmButtonText: 'Reseñar',
      cancelButtonText: 'Volver',
      // inputPlaceholder: 'Introduzca el motivo de cancelación',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    });

    if (text) {
      this.st.reseniarTurno(turno, text);
      retorno = true;
    }
    else
    {
      this.alert.lanzarAlertaError("Reseña no grabada.")
    }
    return retorno;
    }

    async verResenia(turno: Turno){

      await Swal.fire({
        title: 'Reseña',
        html: turno.resenia,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#198754',
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancelar',

      })
    }



}
