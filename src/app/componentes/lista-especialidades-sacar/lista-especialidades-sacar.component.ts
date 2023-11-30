import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/clases/usuario';
import { Dia } from 'src/app/clases/dia';
import { reference } from '@popperjs/core';
import { AnimateTimings } from '@angular/animations';
import * as moment from 'moment';
import 'moment/locale/es';
import { Turno } from 'src/app/clases/turno';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lista-especialidades-sacar',
  templateUrl: './lista-especialidades-sacar.component.html',
  styleUrls: ['./lista-especialidades-sacar.component.css'],
})
export class ListaEspecialidadesSacarComponent implements OnInit {
  listaItems: any;
  @Output() esp = new EventEmitter<string>();
  @Output() turnos = new EventEmitter<any>();
  @Input() especialista: any;
  @Input() accion: any;
  // @Input() especialidad: any;
  @Output() especialidad = new EventEmitter<any>();

  //TRAER
  listaHorarios: any;
  listaTurnos: any;
  listaDias: any[] = [];

  //AUX
  listaHorariosEsp: any[] = [];
  listaHoras: any[] = [];

  //ENVIAR
  listaTurnosLibresEsp: any[] = [];
  listaTurnosActivosEsp: any[] = [];

  //MOSTRAR
  listaEsptas: any[] = [];
  listaEsptas2: any[] = [];
  listaMailsEspecialistas: any[] = [];

  constructor(public auth: AuthService, public st: StorageService,   private _location: Location,) {}

  ngOnInit() {
    this.traerListaActualizada();
    this.traerListaTurnos();
    // this.traerListaUsuarios();
    this.traerListaHorarios();
    this.traerListaTurnos();
  }

  consola() {
    this.listaItems = this.especialista.especialidad;
    console.log('especialistaaa', this.especialista);
  }

  traerListaActualizada() {
    this.st
      .getCollection('especialista', 'nombre')
      .subscribe((datos: any) => (this.listaItems = datos.e));
    console.log('this.listaItems', this.listaItems);
  }

  enviarEspecialidad(esp: string) {
    this.esp.emit(esp);
  }

  traerListaTurnos() {
    this.st.getCollection('turnos', 'esptaEmail').subscribe((datos) => {
      this.listaTurnos = datos;
    });
  }

  crearListaTurnosLibres(espta: any) {
    this.listaTurnosActivosEsp = [];
    for (let t of this.listaTurnos) {
      if (t.esptaEmail == espta.email && t.estado == 'pendiente') {
        this.listaTurnosActivosEsp.push(t);
      }
    }
  }

  dias() {
    this.listaDias = [];
    for (let i = 0; i < 15; i++) {
      var maniana = moment().add(1, 'days'); //día de la semana en número
      var diaAGrabar = maniana.add(i, 'days');
      var diaObj = new Dia(
        diaAGrabar.format('dddd'),
        diaAGrabar.format('YYYY-MM-DD')
      );
      this.listaDias.push(diaObj);
    }
  }

  horas(horaDesde: any, horaHasta: any) {
    this.listaHoras = [];
    var horaDesdeMom = moment(horaDesde, 'HH:mm');
    var horaHastaMom = moment(horaHasta, 'HH:mm');
    var horaAGrabar = horaDesdeMom;
    this.listaHoras.push(horaDesdeMom.format('HH:mm'));
    do {
      horaAGrabar = horaDesdeMom.add(30, 'minutes');
      if (horaAGrabar >= horaHastaMom) {
        break;
      } else {
        this.listaHoras.push(horaAGrabar.format('HH:mm'));
      }
    } while (horaAGrabar < horaHastaMom);
  }

  horariosEspta(espta: string) {
    this.listaHorariosEsp = [];
    for (let h of this.listaHorarios) {
      if (h.email == espta && h.horaDesde != '') {
        this.listaHorariosEsp.push(h);
      }
    }
  }

  generadorTurnos(
    espta: any //tiene que recibir todo el espta
  ) {
    console.log(this.listaTurnos);
    this.listaTurnosLibresEsp = [];
    this.dias();
    this.horariosEspta(espta.email);
    for (let h of this.listaHorariosEsp) {
      for (let d of this.listaDias) {
        if (d.diaSemana == h.diaSemana) {
          this.horas(h.horaDesde, h.horaHasta);
          for (var hora of this.listaHoras) {
            var turno = new Turno(
              espta.nombre,
              espta.apellido,
              espta.email,
              espta.dni,
              this.especialidad,
              d.diaSemana,
              d.fecha,
              hora
            );
            this.listaTurnosLibresEsp.push(turno);
          }
        }
      }
    }
  }

  validadorTurnos() {
    for (let i = this.listaTurnosLibresEsp.length - 1; i > -1; i--) {
      for (let l of this.listaTurnos) {
        if (
          this.listaTurnosLibresEsp[i].dia == l.dia &&
          this.listaTurnosLibresEsp[i].hora == l.hora &&
          this.listaTurnosLibresEsp[i].esptaEmail == l.esptaEmail &&
          (l.estado == 'pendiente' || l.estado == 'aceptado')
        ) {
          this.listaTurnosLibresEsp.splice(i, 1);
        }
      }
    }
  }

  traerListaHorarios() {
    this.st
      .getCollection('horarios', 'diaSemana')
      .subscribe((datos) => (this.listaHorarios = datos));
  }
  enviarTurnos(espta: any, esp:any) {
    console.log('accion', this.accion);
    // console.log('this.listaTurnos', this.listaTurnos);
    // console.log('this.listaHorariosEsp', this.listaHorariosEsp);
    // console.log( "this.esp",this.esp)
    console.log( "espta",espta)
    // if (this.accion == 'cancelar') {
    //   this.crearListaTurnosLibres(espta);
    //   this.turnos.emit(this.listaTurnosActivosEsp);
    // }
    // if (this.accion == 'sacar') {
      // this.generadorTurnos(espta);
      console.log('tis.listaTurnosh');
      this.listaTurnosLibresEsp = [];
      this.dias();
      this.horariosEspta(espta.email);
      for (let h of this.listaHorariosEsp) {
        for (let d of this.listaDias) {
          if (d.diaSemana == h.diaSemana) {
            this.horas(h.horaDesde, h.horaHasta);
            for (var hora of this.listaHoras) {
              var turno = new Turno(
                espta.nombre,
                espta.apellido,
                espta.email,
                espta.dni,
                esp,
                d.diaSemana,
                d.fecha,
                hora
              );
              this.listaTurnosLibresEsp.push(turno);
            }
          }
        }
      }
      this.validadorTurnos();
      console.log('this.listaTurnosLibresEsp', this.listaTurnosLibresEsp);
      console.log('this.listaTurnosActivosEsp', this.listaTurnosActivosEsp);
      this.turnos.emit(this.listaTurnosLibresEsp);
      console.log(this.listaTurnosLibresEsp);
    // }
  }
}
