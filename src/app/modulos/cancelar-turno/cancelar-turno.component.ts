import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';


@Component({
  selector: 'app-cancelar-turno',
  templateUrl: './cancelar-turno.component.html',
  styleUrls: ['./cancelar-turno.component.css']
})
export class CancelarTurnoComponent implements OnInit {

  esp = '';
  espta = '';
  turno: Turno[] = [];
  constructor() { }

  ngOnInit() {
  }

  setEsp(esp: string)
  {
    this.esp = esp;
    this.turno = [];
  }

  setTurnos(turnos: any)
  {
    this.turno = [];
    this.turno = turnos;
  }

}
