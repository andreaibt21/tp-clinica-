import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';
import { Error404Component } from './componentes/error404/error404.component';
import { VerificadaComponent } from './componentes/verificada/verificada.component';
import { GestionTurnoEsptaComponent } from './modulos/gestion-turno-espta/gestion-turno-espta.component';
import { GestionTurnoPacComponent } from './modulos/gestion-turno-pac/gestion-turno-pac.component';
import { SacarTurnoComponent } from './modulos/sacar-turno/sacar-turno.component';
import { MiPerfilComponent } from './modulos/mi-perfil/mi-perfil.component';
import { CancelarTurnoComponent } from './modulos/cancelar-turno/cancelar-turno.component';
import { UsuariosComponent } from './modulos/usuarios/usuarios.component';
import { PacientesComponent } from './modulos/pacientes/pacientes.component';
import { InformesComponent } from './modulos/informes/informes.component';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'inicio',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    //  component: LoginComponent,
    loadChildren: () =>
      import('./modulos/inicio/inicio.module').then((mod) => mod.InicioModule),
      data: { animationState: 'One' }

    },
  {
    path: 'login',
    //  component: LoginComponent,
    loadChildren: () =>
      import('./modulos/login/login.module').then((mod) => mod.LoginModule),
      data: { animationState: 'Two' }
  },
  {
    path: 'home-espera',
    //  component: LoginComponent,
    loadChildren: () =>
      import('./modulos/home-espera/home-espera.module').then(
        (mod) => mod.HomeEsperaModule
      ),data: { animationState: 'Two' }
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./modulos/registro/registro.module').then(
        (mod) => mod.RegistroModule
      ),data: { animationState: 'Three' }
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modulos/home/home.module').then((mod) => mod.HomeModule),
      data: { animationState: 'Three' }
  },
  {
    path: 'pacientes',
  component: PacientesComponent,data: { animationState: 'One' }
},
  {
    path: 'usuarios',
    component: UsuariosComponent,data: { animationState: 'One' }
  },
  {
    path: 'gestion-turno-espta',
    component: GestionTurnoEsptaComponent,data: { animationState: 'One' }
  },
  {
    path: 'gestion-turno-pac',
    component: GestionTurnoPacComponent,data: { animationState: 'One' }
  },
  {
    path: 'sacar-turno',
    component: SacarTurnoComponent,data: { animationState: 'One' }
  },
  {
    path: 'mi-perfil',
    component: MiPerfilComponent,data: { animationState: 'One' }
  },
  {
    path: 'cancelar-turno',
    component: CancelarTurnoComponent,data: { animationState: 'One' }
  },
  
  {
    path: 'informes',
    component: InformesComponent,data: { animationState: 'One' }
  },
  {
    path: 'error',
    component: ErrorComponent,data: { animationState: 'One' }
  },
  {
    path: '**',
    component: Error404Component,data: { animationState: 'One' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
