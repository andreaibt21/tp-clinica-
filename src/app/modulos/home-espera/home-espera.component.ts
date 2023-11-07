import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home-espera',
  templateUrl: './home-espera.component.html',
  styleUrls: ['./home-espera.component.scss']
})
export class HomeEsperaComponent implements OnInit {


  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  salir()
  {
    this.auth.logout('/');
  }

}
