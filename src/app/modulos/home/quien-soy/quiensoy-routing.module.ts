import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { QuienSoyComponent } from './quien-soy.component';

const routes: Routes = [{ path: '', component: QuienSoyComponent, children: []  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuiensoyRoutingModule { }
