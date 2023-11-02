import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-pre-registro',
  templateUrl: './pre-registro.component.html',
  styleUrls: ['./pre-registro.component.scss']
})
export class PreRegistroComponent implements OnInit {

  @Output() rol = new EventEmitter<string>();
  @Output() esAdmin = new EventEmitter<any>();


  constructor(private router: Router, private auth: AuthService, public st: StorageService) { }

  ensenar: boolean = true;

  ngOnInit() {
    this.st.usuarioObj = new Usuario('', '', '', '', '', '', '', '', []);
    this.auth.getAuth().subscribe(res => {
      if(res != null){ this.st.getUser(res?.email);
      }
      })
  }

  registrar(tipoUser: any)
  {
    this.rol.emit(tipoUser);
    this.esAdmin.emit(this.st.usuarioObj.rol == 'Admin');

  }
}
