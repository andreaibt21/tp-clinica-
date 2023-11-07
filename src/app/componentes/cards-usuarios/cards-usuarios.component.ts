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

  historia: any; //esto es lo que hay que enviar al componente
  verHistoria = false;
  listaHistorias: any;

  ngOnInit() {}
  verificarUsuario(usuario: any) {
    this.st.aprobarUser(usuario);
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
    console.log(this.listaTurnos);
    let ord = this.listaTurnos.sort(
      (b: any, a: any) =>
        +moment(a.dia + a.hora, 'YYYY-MM-DD HH:mm').format('YYYYMMDDHHmm') -
        +moment(b.dia + b.hora, 'YYYY-MM-DD HH:mm').format('YYYYMMDDHHmm')
    );
    let listaTurnosPac = [];
    for (let t of ord) {
      if (listaTurnosPac.length < 3) {
        if (t.pacEmail == email && t.estado == 'finalizado') {
          listaTurnosPac.push(t);
        }
      }
    }
    console.log(listaTurnosPac[0].dia);
    //this.alerta.lanzarMensajeTurnos(listaTurnosPac);
  }

  descargarTurnos(pacEmail: any) {
    if (this.listaTurnos.length > 0) {
      this.pdf.exportTurnos(this.listaTurnos, '', pacEmail);
    } else {
      this.alerta.lanzarAlertaError('No tiene turnos todavía');
    }
  }
}
