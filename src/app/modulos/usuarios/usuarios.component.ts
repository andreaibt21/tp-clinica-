import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  listaItems: any;
  tipoUser: string = '';
  verificado: string = '';
  visualizacion = 'cards';


  constructor(private st: StorageService) { }
  ngOnInit() {
    this.traerListaActualizada();
  }

  traerListaActualizada() {
    this.st.getCollection('usuarios', 'nombre').subscribe(datos => this.listaItems = datos);
  }

  asignarTipoUserVerificado(tipo: string)
  {
    switch(tipo){
      case 'EspecialistaNV':
        this.tipoUser = 'Especialista';
        this.verificado = 'false';
        break;
      default:
        this.tipoUser = tipo;
        this.verificado = 'true';
    }
  }

  setVisualizacion(v: any)
  {
    this.visualizacion = v;
  }



}
