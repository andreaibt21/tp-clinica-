import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { Usuario } from 'src/app/clases/usuario';
@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.scss'],
})
export class SeccionesComponent {
  constructor(private router: Router,private auth: AuthService, public st: StorageService) {}

  logueado = this.auth.getAuth();

  ngOnInit() {
    this.st.usuarioObj = new Usuario('', '', '', '', '', '', '', '', []);
    this.auth.getAuth().subscribe(res => {
      if(res != null){ this.st.getUser(res?.email); }
      })
  }

  handleQuiensoy() {
    console.log('Secciones');
    this.router.navigateByUrl('home/quiensoy');
  }
  handleJuegos() {
    console.log('juegos');
    this.router.navigateByUrl('juegos');
  }
  handleChat() {
    console.log('chat');
    this.router.navigateByUrl('home/chat');
  }
}
