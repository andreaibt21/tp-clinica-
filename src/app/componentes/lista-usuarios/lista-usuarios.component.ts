import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  constructor(public st: StorageService) { }

  @Input() listaItems: any;
  @Input() tipoUser: any;
  @Input() verificado: any;
  verTodos = true;

  ngOnInit() {
  }
  verificarUsuario(usuario: any)
  {
    this.st.aprobarUser(usuario);
  }

  descargarUsers() {
    var table_elt = document.getElementById("users-table");
    var workbook = XLSX.utils.table_to_book(table_elt);
    var ws = workbook.Sheets["Sheet1"];
    XLSX.writeFile(workbook, "usuarios.xlsx");
  }

  setVerTodos(valor: boolean){
    this.verTodos = valor;
  }


}
