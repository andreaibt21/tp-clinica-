import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Turno } from 'src/app/clases/turno';
import { StorageService } from 'src/app/services/storage.service';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-gestion-turno-espta',
  templateUrl: './gestion-turno-espta.component.html',
  styleUrls: ['./gestion-turno-espta.component.scss'],
})
export class GestionTurnoEsptaComponent implements OnInit {
  usuario: any;
  listaUsuarios: any;
  listaTurnos: any;
  listaTurnosOk: any;
  listaFechas: any[] = [];
  filtroEsp: any;
  listaEspecialidades: any[] = [];
  listaHistorias: any;
  listaHoras: any[] = [];
  dniPac: any;
  historia = false;
  turno: any;
  campo = '';
  valor = '';
  diaSemana = 'lunes';
  estado = '';
  especialidad = '';
  fecha = '';
  hora = '';
  campoAMostrar = 'pacNombre';

  constructor(
    private auth: AuthService,
    public st: StorageService,
    private busq: BusquedaService
  ) {}

  ngOnInit() {
    // this.listaEspecialidades= [];
    this.auth.getAuth().subscribe((res) => {
      if (res != null) {
        if (this.listaEspecialidades.length == 0) {
          this.listaEspecialidades = [];
          this.traerEspecialidades(res.email);
          this.traerFechas(res.email);
          this.traerHoras(res.email);
          console.log(this.listaEspecialidades);
        }
        this.traerTurnos();
      }
    });
    console.log(this.listaEspecialidades);
    this.traerHistorias();
  }

  setHist(historia: boolean) {
    this.historia = historia;
  }

  setTurno(turno: Turno) {
    this.turno = turno;
  }

  traerEspecialidades(email: any) {
    this.listaEspecialidades = [];
    this.st.getCollection('usuarios', 'nombre').subscribe((datos: any) => {
      this.listaUsuarios = datos;

      for (let i of this.listaUsuarios) {
        if (i.email == email) {
          for (let e of i.especialidad) {
            this.listaEspecialidades.push(e);
          }
        }
      }
    });
  }

  traerFechas(email: any) {
    this.listaFechas = [];
    this.st.getCollection('turnos', 'dia').subscribe((datos: any) => {
      this.listaTurnos = datos;
      for (let t of this.listaTurnos) {
        let duplicado = false;
        if (t.esptaEmail == email) {
          for (let f of this.listaFechas) {
            if (t.dia == f) {
              duplicado = true;
            }
          }
          if (duplicado) {
            break;
          }
          this.listaFechas.push(t.dia);
        }
      }
    });
  }

  traerHoras(email: any) {
    this.listaHoras = [];
    this.st.getCollection('turnos', 'dia').subscribe((datos: any) => {
      this.listaTurnos = datos;
      for (let t of this.listaTurnos) {
        let duplicado = false;
        if (t.esptaEmail == email) {
          for (let h of this.listaHoras) {
            if (t.hora == h) {
              duplicado = true;
            }
          }
          if (duplicado) {
            break;
          }
          this.listaHoras.push(t.hora);
        }
      }
    });
  }

  buscar(
    campo: any,
    valor: any //se envía a la tabla listaTurnos
  ) {
    this.listaTurnosOk = this.busq.buscar(campo, valor, this.listaTurnos);
    this.campo = campo;
    this.valor = valor;
  }
  buscarhistoria(
    campo: any,
    valor: any //se envía a la tabla listaTurnos
  ) {

    this.listaTurnosOk = this.busq.buscarHI(campo, valor, this.listaTurnos);
    this.campo = campo;
    this.valor = valor;
  }


  traerTurnos() {
    this.st.getCollection('turnos', 'dia').subscribe((datos: any) => {
      const newDatos = datos.map((element: any) => {
      //  console.log('element', element);
        return {
          ...element,
          historia: element.historia ? JSON.parse(element.historia) : "No tiene historia",
        };
      });
      console.log('turnios', newDatos);
      this.listaTurnos = newDatos;
      this.listaTurnosOk = newDatos;
    });
  }

  traerHistorias() {
    this.st.getCollection('historias', 'pacDni').subscribe((datos: any) => {
      this.listaHistorias = datos;
    });
  }

  enviarFiltroEsp(esp: any) {
    this.filtroEsp = esp;
    this.dniPac = '';
  }

  enviarFiltroDni(dni: any) {
    this.filtroEsp = '';
    this.dniPac = dni;
  }

  enviarFiltrohistoria(campo: any) {
    this.filtroEsp = '';
    this.dniPac = campo;
  }
  onChange(value: any) {
    this.campoAMostrar = value;
  }

  onChangeDiaSemana(value: any) {
    this.diaSemana = value;
    this.listaTurnosOk = this.busq.buscar(
      'diaSemana',
      this.diaSemana,
      this.listaTurnos
    );
  }

  onChangeEstado(value: any) {
    this.estado = value;
    this.listaTurnosOk = this.busq.buscar(
      'estado',
      this.estado,
      this.listaTurnos
    );
  }

  onChangeFecha(value: any) {
    this.fecha = value;
    this.listaTurnosOk = this.busq.buscar('dia', this.fecha, this.listaTurnos);
  }

  onChangeHora(value: any) {
    this.hora = value;
    this.listaTurnosOk = this.busq.buscar('hora', this.hora, this.listaTurnos);
  }
}
