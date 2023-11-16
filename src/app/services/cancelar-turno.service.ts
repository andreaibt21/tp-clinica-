import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Turno } from 'src/app/clases/turno';
import { StorageService } from 'src/app/services/storage.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class CancelarTurnoService {
  constructor(public st: StorageService, public alert: AlertService) {}

  async cancelarTurno(turno: any) {
    var retorno = false;
    const { value: text } = await Swal.fire({
      title: 'Cancelar Turno',
      input: 'textarea',
      inputLabel: 'Motivo de cancelación*',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#198754',
      confirmButtonText: 'Cancelar Turno',
      cancelButtonText: 'Volver',
      inputPlaceholder: 'Introduzca el motivo de cancelación',
      inputAttributes: {
        'aria-label': 'Type your message here',
      },
      showCancelButton: true,
    });

    if (text) {
      this.st.cambiarEstadoTurno(turno, 'cancelar', text);
      retorno = true;
    } else {
      this.alert.lanzarAlertaError(
        'El motivo es obligatorio. Turno no cancelado.'
      );
    }
    return retorno;
  }

  async rechazarTurno(turno: any) {
    var retorno = false;
    const { value: text } = await Swal.fire({
      title: 'Rechazar Turno',
      input: 'textarea',
      inputLabel: 'Motivo de rechazo*',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#198754',
      confirmButtonText: 'Rechazar Turno',
      cancelButtonText: 'Volver',
      inputPlaceholder: 'Introduzca el motivo del rechazo',
      inputAttributes: {
        'aria-label': 'Type your message here',
      },
      showCancelButton: true,
    });

    if (text) {
      this.st.cambiarEstadoTurno(turno, 'rechazar', text);
      retorno = true;
    } else {
      this.alert.lanzarAlertaError(
        'El motivo es obligatorio. Turno no cancelado.'
      );
    }
    return retorno;
  }
}
