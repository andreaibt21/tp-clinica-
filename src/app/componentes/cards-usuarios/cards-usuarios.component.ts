import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AlertService } from 'src/app/services/alert.service';
import * as moment from 'moment';
import { ExportPDFService } from 'src/app/services/exportPDF.service';

@Component({
  selector: 'app-cards-usuarios',
  templateUrl: './cards-usuarios.component.html',
  styleUrls: ['./cards-usuarios.component.scss'],
})
export class CardsUsuariosComponent implements OnInit {
  constructor(
    public st: StorageService,
    public alerta: AlertService,
    public pdf: ExportPDFService
  ) {}

  @Input() listaItems: any;
  @Input() tipoUser: any;
  @Input() verificado: any;
  @Input() listaTurnos: any;
  @Input() origen: any; //admin //espta
  dato: any;
  dato1: any;
  historia: any; //esto es lo que hay que enviar al componente
  verHistoria = false;
  listaHistorias: any;

  ngOnInit() {}
  verificarUsuario(usuario: any) {
    this.st.aprobarUser(usuario);
  }
  ngOnDestroy() {
    //this.dato.next();
   // this.dato.complete();
   // this.dato1.next();
  //  this.dato1.complete();
  }
  setVerHistoria(valor: any) {
    this.verHistoria = valor;
  }
  traerHistorias(email: any) {
    console.log(email);
    this.st.getCollection('historias', 'pacEmail').subscribe((datos) => {
      this.listaHistorias = datos;
      for (let h of this.listaHistorias) {
        if (h.pacEmail == email) {
          this.historia = h;
          console.log(this.historia);
          this.verHistoria = true;
        }
      }
      if (this.verHistoria == false) {
        this.alerta.lanzarAlertaError('El paciente no tiene historia cargada');
      }
    });
  }

  getTurnosPorUser(email: any) {
    let ord;
    this.dato = this.st
      .getCollection('turnos', 'esptaEmail')
      .subscribe((datos) => {
        console.log('datos', datos);
        this.listaTurnos = datos;

        // this.st.getTurnos(email)
        // console.log(this.st.listaturnos);

        let listaTurnosPac = [];

        for (let t of this.listaTurnos) {
          if (this.listaTurnos.length != 0) {
            if (t.pacEmail == email && t.estado == 'finalizado') {
              listaTurnosPac.push(t);
              console.log(t);
            }
          }
        }
        ord = listaTurnosPac.sort(
          (b: any, a: any) =>
            +moment(a.dia + a.hora, 'YYYY-MM-DD HH:mm').format('YYYYMMDDHHmm') -
            +moment(b.dia + b.hora, 'YYYY-MM-DD HH:mm').format('YYYYMMDDHHmm')
        );
        //console.log(listaTurnosPac[0].dia);
        if(ord != null){
          this.alerta.lanzarMensajeTurnos(ord);
        }
      });
  }

  descargarTurnos(pacEmail: any) {
    this.dato = this.st
    .getCollection('turnos', 'esptaEmail')
    .subscribe((datos) => {
      console.log('datos', datos);
      this.listaTurnos = datos;

      // this.st.getTurnos(email)
      // console.log(this.st.listaturnos);

      let listaTurnosPac = [];

      for (let t of this.listaTurnos) {
        if (this.listaTurnos.length != 0) {
          if (t.pacEmail == pacEmail && t.estado == 'finalizado') {
            listaTurnosPac.push(t);
            console.log(t);
          }
        }
      }
      let ord = listaTurnosPac.sort(
        (b: any, a: any) =>
          +moment(a.dia + a.hora, 'YYYY-MM-DD HH:mm').format('YYYYMMDDHHmm') -
          +moment(b.dia + b.hora, 'YYYY-MM-DD HH:mm').format('YYYYMMDDHHmm')
      );

    if (ord.length > 0) {
      this.pdf.exportTurnos(ord, '', pacEmail);
    } else {
      this.alerta.lanzarAlertaError('No tiene turnos todavía');
    }
    })



  }
}
