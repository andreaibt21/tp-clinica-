import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListaUsuariosComponent } from 'src/app/componentes/lista-usuarios/lista-usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './usuarios.component';
import { CardsUsuariosComponent } from 'src/app/componentes/cards-usuarios/cards-usuarios.component';
import { SpinnerComponent } from 'src/app/componentes/spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ListaUsuariosComponent,
    UsuariosComponent,
    CardsUsuariosComponent,
    SpinnerComponent,
  ],
})
export class UsuariosModule {}
