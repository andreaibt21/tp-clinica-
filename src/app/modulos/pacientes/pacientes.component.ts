import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  listaItems: any;
  listaPacientes: any;
  listaTurnos: any;
  visualizacion = 'cards';


  constructor(private st: StorageService, private auth: AuthService) { }

  ngOnInit() {
    this.traerListaActualizada();
    this.traerListaTurnos()
  }

  traerListaActualizada() {
    this.listaPacientes = [];

    this.auth.getAuth().subscribe((res )=> {
      if(res != null){
        this.st.getCollection('usuarios', 'nombre')
        .subscribe((datos) =>{
          this.listaItems = datos; //usuarios
          this.st.getCollection('turnos', 'dia')
            .subscribe((datos) =>{
              this.listaTurnos = datos;
              for(let i = this.listaItems.length - 1; i > -1 ; i--)
              {
                let estaEnLaLista = false;
                for(let t of this.listaTurnos)
                {
                    if(this.listaItems[i].email == t.pacEmail && res?.email == t.esptaEmail)
                    {
                      estaEnLaLista = true;
                    }
                }
                if(!estaEnLaLista)
                {
                  this.listaItems.splice(i, 1);
                }
              }


            });


          // for(let i of this.listaItems)
          // {
          //   if(i.rol == 'Paciente')
          //   {
          //     this.listaPacientes.push(i);
          //   }
          // }
        });



       }
      })

  }

  traerListaTurnos() {
    this.listaPacientes = [];
    this.st.getCollection('turnos', 'pacNombre')
          .subscribe((datos:any) =>{
            this.listaTurnos = datos;
          });
  }

  setVisualizacion(i:any){
    console.log(this.listaPacientes);
    this.visualizacion = i;
  }

}
