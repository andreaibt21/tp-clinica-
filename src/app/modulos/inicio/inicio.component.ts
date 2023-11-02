import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  constructor(private auth: AuthService, private router: Router) { }
  logueado = this.auth.getUsuarioLogueado();
  ngOnInit() {
  }

 acceso(){
    this.auth.getUsuarioLogueado().subscribe(user => {
      user?.email ? this.router.navigate(['/home']) : this.router.navigate(['/login'])
    });
  }
}
