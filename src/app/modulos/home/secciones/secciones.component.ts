import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.scss']
})
export class SeccionesComponent {
  constructor( private router: Router) {}


  handleQuiensoy(){
    console.log('Secciones')
    this.router.navigateByUrl('home/quiensoy');

  }
  handleJuegos(){
    console.log('juegos')
    this.router.navigateByUrl('juegos');

  }
  handleChat(){
    console.log('chat')
    this.router.navigateByUrl('home/chat');

  }

}
