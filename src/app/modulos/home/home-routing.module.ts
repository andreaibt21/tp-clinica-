import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import(`./secciones/secciones.module`).then((m) => m.SeccionesModule),
      },
      {
        path: 'quiensoy',
        loadChildren: () =>
          import(`./quien-soy/quiensoy.module`).then((m) => m.QuiensoyModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
