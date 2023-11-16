import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Turno } from 'src/app/clases/turno';
import { StorageService } from 'src/app/services/storage.service';
import { AlertService } from './alert.service';



@Injectable({
  providedIn: 'root'
})
export class ConfirmarTurnoService {

constructor(public st: StorageService, public alert: AlertService) { }

async confirmarTurno(turno: Turno){

  var paciente = turno.pacNombre+' '+turno.pacApellido;
  var dr = 'Especialista: '+turno.esptaNombre+' '+turno.esptaApellido;
  var especialidad = turno.especialidad;
  var dia = turno.dia;
  var hora = turno.hora;

  await Swal.fire({
    title: '<strong>¿Confirmar turno?</strong>',
    html: '<b>'+paciente+'</b><br>'+dr+'<br>'+especialidad+'<br>'+dia+' '+hora,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    cancelButtonColor: '#d33',
    confirmButtonColor: '#198754',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
      if(result.isConfirmed){
      this.st.addTurno(turno).then(()=> {
        this.alert.lanzarAlertaExito("Cita grabada");
      })
    }
  })
}

async confirmarTurnoAdmin(turno: any, listaPacientes: any[]){
  const { value: text } = await Swal.fire({
    title: 'DNI del paciente',
    input: 'text',
    // inputLabel: 'DNI',
    cancelButtonColor: '#d33',
    confirmButtonColor: '#198754',
    confirmButtonText: 'Buscar',
    cancelButtonText: 'Cancelar',
    inputPlaceholder: 'Introduzca el DNI sin guiones y sin espacios',
    inputAttributes: {
      'aria-label': 'Type your message here'
    },
    showCancelButton: true
  });

  if (text) {
    for(let p of listaPacientes)
    {
      if(p.dni == text)
      {
        turno.turnoMasPaciente(turno, p.nombre, p.apellido, p.email, p.dni);
        console.log(turno);
        this.confirmarTurno(turno);
        break
      }
    }
  }
  }
}

