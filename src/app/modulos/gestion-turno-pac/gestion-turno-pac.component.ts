import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-gestion-turno-pac',
  templateUrl: './gestion-turno-pac.component.html',
  styleUrls: ['./gestion-turno-pac.component.scss'],
})
export class GestionTurnoPacComponent implements OnInit {
  constructor(
    private auth: AuthService,
    public st: StorageService,
    private busq: BusquedaService
  ) {}
  listaEspecialidades: any[] = [];
  listaFechas: any[] = [];
  listaHoras: any[] = [];
  listaTurnos: any;
  listaTurnosOk: any;
  dniEsp: any;
  filtroEsp: any;
  campo = '';
  valor = '';
  campoAMostrar = 'esptaNombre';
  diaSemana = 'lunes';
  estado = '';
  especialidad = '';
  fecha = '';
  hora = '';

  ngOnInit() {
    this.auth.getAuth().subscribe((res) => {
      if (res != null) {
        console.log(res);
        if (this.listaEspecialidades.length == 0) {
          this.listaEspecialidades = [];
          this.traerEspecialidades(res.email);
          this.traerFechas(res.email);
          this.traerHoras(res.email);
          console.log(this.listaEspecialidades);
        }
      }
    });
    this.traerTurnos();
  }

  traerEspecialidades(email: any) {
    this.listaEspecialidades = [];
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

  traerFechas(email: any) {
    this.listaFechas = [];
    this.st.getCollection('turnos', 'dia').subscribe((datos) => {
      this.listaTurnos = datos;
      for (let t of this.listaTurnos) {
        let duplicado = false;
        if (t.pacEmail == email) {
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
  buscarhistoria(
    campo: any,
    valor: any //se envía a la tabla listaTurnos
  ) {

    this.listaTurnosOk = this.busq.buscarHI(campo, valor, this.listaTurnos);
    this.campo = campo;
    this.valor = valor;
  }
  traerHoras(email: any) {
    this.listaHoras = [];
    this.st.getCollection('turnos', 'dia').subscribe((datos) => {
      this.listaTurnos = datos;
      for (let t of this.listaTurnos) {
        let duplicado = false;
        if (t.pacEmail == email) {
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

  traerTurnos() {
    this.st.getCollection('turnos', 'dia').subscribe((datos) => {
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

  enviarFiltroDni(dni: any) {
    this.traerTurnos();
    this.filtroEsp = '';
    this.dniEsp = dni;
  }

  enviarFiltroEsp(esp: any) {
    this.traerTurnos();
    console.log(this.listaTurnos);
    this.filtroEsp = esp;
    this.dniEsp = '';
  }

  buscar(
    campo: any,
    valor: any //se envía a la tabla listaTurnos
  ) {
    // this.traerTurnos();
    console.log(campo);
    console.log(this.listaTurnos);
    console.log(this.listaTurnosOk);
    this.listaTurnosOk = this.busq.buscar(campo, valor, this.listaTurnos);
    this.campo = campo;
    this.valor = valor;
    console.log(this.listaTurnos);
    console.log(this.listaTurnosOk);
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
