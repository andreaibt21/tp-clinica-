import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';


@Component({
  selector: 'app-sacar-turno',
  templateUrl: './sacar-turno.component.html',
  styleUrls: ['./sacar-turno.component.css']
})
export class SacarTurnoComponent implements OnInit {

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
    this.turno = turnos;
  }

}
