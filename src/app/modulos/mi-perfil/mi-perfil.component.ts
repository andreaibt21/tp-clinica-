import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Horario } from 'src/app/clases/horario';
import { ExportPDFService } from 'src/app/services/exportPDF.service';

import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css'],
})
export class MiPerfilComponent implements OnInit {
  horaDesde = '';
  horaHasta = '';
  dia = '';
  listaItems: any;
  listaHistorias: any;
  historia: any;
  verHistoria = false;
  listaEspecialidades: any[] = [];
  listaTurnos: any;
  listaTurnosHistorias: any;


  constructor(
    public st: StorageService,
    public auth: AuthService,
    public alerta: AlertService,
    public pdf: ExportPDFService
  ) {}

  ngOnInit() {
    this.auth.getAuth().subscribe((res) => {
      if (res != null) {
        this.st.getImages(res?.email);
        this.traerHistorias(res?.email);
        this.traerEspecialidades(res?.email);
      }
    });
    this.traerListaActualizada();
    this.traerTurnos();

  }

  elegirDia(dia: any) {
    this.dia = dia;
  }

  horaDesdeEsMenorAHoraHasta() {
    var retorno = null;
    console.log(this.horaDesde < this.horaHasta);
    this.horaDesde != '' && this.horaDesde < this.horaHasta
      ? (retorno = true)
      : (retorno = false);
    return retorno;
  }

  grabarDia(dia: any) {
    if (this.horaDesdeEsMenorAHoraHasta()) {
      var clave = this.st.usuarioObj.email + '_' + dia;
      var horario = new Horario(
        this.st.usuarioObj.nombre,
        this.st.usuarioObj.email,
        clave,
        dia,
        this.horaDesde,
        this.horaHasta
      );
      this.st
        .addHorarioConValidacion(horario)
        .then(() =>
          this.alerta.lanzarAlertaExito('Horario añadido/modificado con éxito')
        );
      this.ngOnInit();
    } else {
      this.alerta.lanzarAlertaError(
        'La hora desde que empieza el horario debe ser menor a la que termina'
      );
    }
  }

  traerListaActualizada() {
    this.st
      .getCollection('horarios', 'diaSemana')
      .subscribe((datos) => (this.listaItems = datos));
  }
  descargarHistoriasDeTurnos(email: any, ) {
    let listaAux: any[] =[];
    const newDatos = this.listaTurnos.map((element: any) => {
      //  console.log('element', element);
        return {
          ...element,
          historia: element.historia ? JSON.parse(element.historia) : "No tiene historia",
        };
      });
      console.log('turnios', newDatos);
      this.listaTurnos = newDatos;
      this.listaTurnos.forEach((turno: any) => {
        if(turno.pacEmail === email){
          listaAux.push(turno)
          console.log("turnoi",turno)
        }
        console.log("listaAux",listaAux)
        this.listaTurnosHistorias = listaAux;
        this.pdf.exportHistoriadeTurnos(this.listaTurnosHistorias,this.st.usuarioObj.nombre + ' ' + this.st.usuarioObj.apellido );

    });

  }

  traerHistorias(email: any) {
    this.st.getCollection('historias', 'pacEmail').subscribe((datos) => {
      this.listaHistorias = datos;
      for (let h of this.listaHistorias) {
        if (h.pacEmail == email) {
          this.historia = h;
        }
      }
    });
  }

  reset() {
    this.horaDesde = '';
    this.horaHasta = '';
  }

  setVerHistoria(valor: boolean) {
    if (this.historia != undefined) {
      this.verHistoria = valor;
    } else {
      this.alerta.lanzarAlertaError('No tiene historia todavía');
    }
  }

  descargarHistoria() {
    if (this.historia != undefined) {
      this.pdf.exportHistoria(this.historia);
    } else {
      this.alerta.lanzarAlertaError('No tiene historia todavía');
    }
  }

  descargarTurnos(especialidad: string) {
    if (this.listaTurnos.length > 0) {
      this.pdf.exportTurnos(this.listaTurnos, especialidad,"",this.st.usuarioObj.nombre + ' ' + this.st.usuarioObj.apellido );
    } else {
      this.alerta.lanzarAlertaError('No tiene turnos.');
    }
  }

  traerEspecialidades(email: any) {
    this.listaEspecialidades = [];
    console.log('llega aquí');
    this.st.getCollection('turnos', 'dia').subscribe((datos) => {
      this.listaTurnos = datos;
      for (let t of this.listaTurnos) {
        let duplicado = false;
        if (t.pacEmail == email) {
          for (let i of this.listaEspecialidades) {
            if (t.especialidad == i) {
              duplicado = true;
            }
          }
          if (duplicado) {
            break;
          }
          this.listaEspecialidades.push(t.especialidad);
        }
      }
    });
  }

  traerTurnos() {
    this.st.getCollection('turnos', 'dia').subscribe((datos) => {
      this.listaTurnos = datos;
    });
  }
}
