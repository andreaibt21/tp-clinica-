import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css'],
})
export class InformesComponent implements OnInit {
  constructor(public st: StorageService) {}
  informe = -1;
  desde = '';
  hasta = '';
  listaTurnos: any;
  listaUsuarios: any;
  listaOk: any[] = [];
  contador2 = 0;
  contador3 = 0;
  contador1 = 0;
  contador4 = 0;
dato4 = "";

  data = {
    labels: [''],
    series: [[]],
  };

  ngOnInit() {
    this.traerListaTurnos();
    this.traerListaUsuarios();
    this.setInformeTE();
  }

  //traer lista de turnos
  traerListaTurnos() {
    this.st.getCollection('turnos', 'esptaEmail').subscribe((datos) => {
      this.listaTurnos = datos;
    });
    // let listaesp = this.listaTurnos.filter((turno: any) => {
    //   turno.especialidad;
    // });
    // // this.listaTurnos.forEach((element: any) => {
    // //   if(element.especialidad =)

    // // });
    // console.log('listaesp', listaesp);
  }
  //traer lista de usuarios
  traerListaUsuarios() {
    this.st.getCollection('usuarios', 'email').subscribe((datos) => {
      this.listaUsuarios = datos;
    });
  }

  setInforme(informe: any) {
    this.informe = informe;
  }

  BuscarPorLapso(desde: any, hasta: any, informe: any) {
    this.desde = hasta;
    this.hasta = hasta;
    this.informe = informe;
  }

  turnosPorDia() {
    this.informe = 1;
    console.log('this.listaTurnos', this.listaTurnos);
    this.listaTurnos?.forEach((turn: any) => {
      this.listaOk.push(turn.diaSemana);
    });
    const result = this.listaOk.reduce(
      (json: any, val: any) => ({ ...json, [val]: (json[val] | 0) + 1 }),
      {}
    );
    let daysWeek = Object.keys(result);
    this.data.labels = [];
    daysWeek.forEach((res) => {
      this.data.labels.push(res);
    });
    console.log(this.data.labels);
    console.log(Object.values(result));
    this.data.series.push(Object.values(result));
    console.log(this.data.series);
  }

  chartOptions = {
    title: {
      text: 'turnos',
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: 'pie', //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabel: '{name}: {y}',
        dataPoints: [
          { y: this.contador1 | 3, name: 'Ginecología' },
          { y: this.contador2 | 4, name: 'Gastroenterología' },
          { y: this.contador3 | 2, name: 'Otro' },
          //{ y: this.contador4 | 2, name:  this.dato4 },
        ],
      },
    ],
  };
  setInformeTE() {
    this.st.getCollection('turnos', 'esptaEmail').subscribe((datos) => {
      this.listaTurnos = datos;
      datos.forEach((element: any) => {
        if (element.especialidad == 'Ginecología') {
          this.contador1++;
        }
        if (element.especialidad == 'Gastroenterología') {
          this.contador2++;
        }
        if (
          element.especialidad !== 'Gastroenterología' &&
          element.especialidad !== 'Ginecología'
        ) {
          this.contador3++;
        }
        if (
          element.especialidad !== 'Gastroenterología' &&
          element.especialidad !== 'Ginecología'
        ) {
          this.contador4++;
          this.dato4 = element.especialidad;
        }
      });
      //console.log('listaesp', listaesp);
      console.log('this.contador1', this.contador1);
      console.log('this.contador2', this.contador2);
      console.log('this.contador3', this.contador3);
    });
  }
}
