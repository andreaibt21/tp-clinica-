import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-lista-especialidades',
  templateUrl: './lista-especialidades.component.html',
  styleUrls: ['./lista-especialidades.component.css'],
})
export class ListaEspecialidadesComponent implements OnInit {
  listaItems: any;
  @Output() esp = new EventEmitter<string>();
  constructor(public auth: AuthService, public st: StorageService) {}

  ngOnInit() {
    this.traerListaActualizada();
  }

  traerListaActualizada() {
    this.st
    .getCollection('especialidades', 'nombre')
    .subscribe((datos:any) => (this.listaItems = datos
      ));
      console.log("this.listaItems",this.listaItems)
  }

  enviarEspecialidad(esp: string) {
    this.esp.emit(esp);
  }
}
