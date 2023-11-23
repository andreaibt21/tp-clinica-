import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmarTurnoService } from 'src/app/services/confirmar-turno.service';
import { Turno } from 'src/app/clases/turno';
import { CancelarTurnoService } from 'src/app/services/cancelar-turno.service';

@Component({
  selector: 'app-lista-turnos-sacar',
  templateUrl: './lista-turnos-sacar.component.html',
  styleUrls: ['./lista-turnos-sacar.component.css'],
})
export class ListaTurnosSacarComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public st: StorageService,
    private ct: ConfirmarTurnoService,
    private cancT: CancelarTurnoService
  ) {}
  @Input() turnos: Turno[] = [];
  @Input() accion: any;
  @Input() esp: any;

  listaPacientes: any[] = [];
  listaItems: any;

  ngOnInit() {
    this.traerListaPacientes();
  }
  consola(){

    console.log("turnos",this.turnos)
    console.log("accion",this.accion)
    console.log("esp",this.esp)
  }
  refrescarLista(turno: any) {
    for (let i = this.turnos.length - 1; i > -1; i--) {
      if (
        turno.dia == this.turnos[i].dia &&
        turno.hora == this.turnos[i].hora
      ) {
        this.turnos.splice(i, 1);
        console.log( this.turnos)
      }
    }
  }

  traerListaPacientes() {
    this.st.getCollection('usuarios', 'nombre').subscribe((datos) => {
      this.listaItems = datos;
      for (let i = 0; i < this.listaItems.length; i++) {
        if (this.listaItems[i].rol == 'Paciente') {
          this.listaPacientes.push(this.listaItems[i]);
        }
      }
    });
  }
  abrirModal(turno: any) {
    console.log(this.accion);
    switch (this.accion) {
      case 'sacar':
        this.sacarTurno(turno);
        break;
      case 'cancelar':
        this.cancelarTurno(turno);
        break;
    }
  }

  sacarTurno(turno: any) {
    var usuario = this.st.usuarioObj;
    if (usuario.rol == 'Paciente') {
      turno.turnoMasPaciente(
        turno,
        usuario.nombre,
        usuario.apellido,
        usuario.email,
        usuario.dni
      );
      this.ct.confirmarTurno(turno).then((res) => {
        console.log(res);
      });
    } else {
      this.ct.confirmarTurnoAdmin(turno, this.listaPacientes).then((res) => {
        console.log(res);
      });
    }
    this.refrescarLista(turno);
  }

  cancelarTurno(turno: any) {
    this.cancT.cancelarTurno(turno).then((res) => {
      if (res) {
        this.refrescarLista(turno);
      }
    });
  }
}
