import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeEsperaComponent } from './home-espera.component';

const routes: Routes = [
  { path: '', component: HomeEsperaComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeEsperaRoutingModule { }
