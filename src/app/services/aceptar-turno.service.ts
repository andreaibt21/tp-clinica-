import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Turno } from 'src/app/clases/turno';
import { StorageService } from 'src/app/services/storage.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AceptarTurnoService {
  constructor(public st: StorageService) {}

  async aceptarTurno(t: Turno) {
    await Swal.fire({
      title: '<strong>¿Aceptar turno?</strong>',
      html:
        '<b>' +
        t.pacNombre +
        '' +
        t.pacApellido +
        '<br>' +
        t.dia +
        ' ' +
        t.hora,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#198754',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.st.cambiarEstadoTurno(t, 'aceptar');
      }
    });
  }
}
