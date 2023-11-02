import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SeccionesComponent } from './secciones/secciones.component';


@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [HomeComponent, SeccionesComponent],
  exports: [HomeComponent]
})
export class HomeModule {}
