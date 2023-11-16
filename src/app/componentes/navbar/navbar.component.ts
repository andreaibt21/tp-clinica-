import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  usuarioLogueado = this.AuthService.getUsuarioLogueado();
  constructor(
    private AuthService: AuthService,
    private _location: Location,
    public st: StorageService
  ) {}

  ngOnInit(): void {}

  handleCerrar = () => {
    this.AuthService.cerrarSesion();
  };
  handleAtras = () => {
    if (
      this._location.path(true) !== '/home/secciones' &&
      this._location.path(true) !== '/home'
    ) {
      this._location.back();
      console.log(this._location.path(true));
    }
  };
  handleVerificarUsuario = () => {
    this.AuthService.getUsuarioLogueado().subscribe((res) => {
      console.log('res', res);
      if (res != null) {
        this.st.getUser(res?.email);
      }
    });
  };
}
