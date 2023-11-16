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
  },
  {
    path: 'login',
    //  component: LoginComponent,
    loadChildren: () =>
      import('./modulos/login/login.module').then((mod) => mod.LoginModule),
  },
  {
    path: 'home-espera',
    //  component: LoginComponent,
    loadChildren: () =>
      import('./modulos/home-espera/home-espera.module').then(
        (mod) => mod.HomeEsperaModule
      ),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./modulos/registro/registro.module').then(
        (mod) => mod.RegistroModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modulos/home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./modulos/usuarios/usuarios.module').then(
        (mod) => mod.UsuariosModule
      ),
  },
  {
    path: 'gestion-turno-espta',
    component: GestionTurnoEsptaComponent,
  },
  {
    path: 'gestion-turno-pac',
    component: GestionTurnoPacComponent,
  },
  {
    path: 'sacar-turno',
    component: SacarTurnoComponent,
  },
  {
    path: 'mi-perfil',
    component: MiPerfilComponent,
  },
  {
    path: 'cancelar-turno',
    component: CancelarTurnoComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '**',
    component: Error404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
