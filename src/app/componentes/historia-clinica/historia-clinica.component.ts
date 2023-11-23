import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { Historia } from 'src/app/clases/historia';


@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {

  @Input() historia: any;
  @Input() origen: any;

  constructor() { }

  ngOnInit() {
  }

}
