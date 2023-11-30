import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/clases/usuario';
import { Dia } from 'src/app/clases/dia';
import { reference } from '@popperjs/core';
import { AnimateTimings } from '@angular/animations';
import * as moment from 'moment';
import 'moment/locale/es';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-lista-especialistas-sacar',
  templateUrl: './lista-especialistas-sacar.component.html',
  styleUrls: ['./lista-especialistas-sacar.component.css'],
})
export class ListaEspecialistasSacarComponent implements OnInit {
  @Output() turnos = new EventEmitter<any>();
  @Output() especialista = new EventEmitter<any>();
  @Input() especialidad: any;
  @Input() accion: any;
  @Output() esp = new EventEmitter<string>();

  //TRAER
  listaItems: any;
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

  constructor(public auth: AuthService, public st: StorageService) {}

  ngOnInit() {
    this.traerListaUsuarios();
    this.traerListaHorarios();
    this.traerListaTurnos();
    //this.traerListaUsuarios2();
  }


  enviarEspecialista(esp: any) {
    this.especialista.emit(esp);
    console.log("esp", esp)
    console.log("this.especialista", this.especialista)
  }

  enviarEspecialidad(esp: string) {
    this.esp.emit(esp);
  }


  traerListaHorarios() {
    this.st
      .getCollection('horarios', 'diaSemana')
      .subscribe((datos) => (this.listaHorarios = datos));
  }

  traerListaTurnos() {
    this.st.getCollection('turnos', 'esptaEmail').subscribe((datos) => {
      this.listaTurnos = datos;
    });
  }
  traerListaUsuarios2() {
    this.st.getCollection('usuarios', 'nombre').subscribe((datos) => {
      this.listaItems = datos;
      for (let i = 0; i < this.listaItems.length; i++) {
        if (this.listaItems[i].rol == 'Especialista') {
          this.listaEsptas2.push(this.listaItems[i]);
        }
      }
      if(this.listaEsptas2.length != 0){
        this.listaItems = this.listaEsptas2
      }
      for (let i = 0; i < this.listaEsptas2.length; i++) {
        this.listaMailsEspecialistas.push(this.listaEsptas2[i].email);
      }
      this.st.getImagenes(this.listaMailsEspecialistas);
    });
    console.log("this.listaEsptas2",this.listaEsptas2)
  }

  traerListaUsuarios() {
    this.st.getCollection('usuarios', 'nombre').subscribe((datos) => {
      this.listaItems = datos;
      for (let i = 0; i < this.listaItems.length; i++) {
        if (this.listaItems[i].rol == 'Especialista') {
          this.listaEsptas2.push(this.listaItems[i]);
        }
      }
      console.log("this.listaEsptas2",this.listaEsptas2)
      for (let i = 0; i < this.listaEsptas2.length; i++) {
        this.listaMailsEspecialistas.push(this.listaEsptas2[i].email);
      }
      console.log("this.listaMailsEspecialistas",this.listaMailsEspecialistas)
      this.st.getImagenes(this.listaMailsEspecialistas);
    });

  }

  enviarTurnos(espta: any) {
    console.log("this.listaEsptas",this.listaEsptas);
    switch (this.accion) {
      case 'cancelar':
        this.crearListaTurnosLibres(espta);
        this.turnos.emit(this.listaTurnosActivosEsp);
        break;
      case 'sacar':
        this.generadorTurnos(espta);
        this.validadorTurnos();
        this.turnos.emit(this.listaTurnosLibresEsp);
        console.log(this.listaTurnosLibresEsp);
        break;
    }
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
}
