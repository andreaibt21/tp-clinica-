import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { AccesoDirectoComponent } from 'src/app/componentes/acceso-directo/acceso-directo.component';

@NgModule({
  imports: [CommonModule, LoginRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [LoginComponent],
  declarations: [LoginComponent,AccesoDirectoComponent],
  providers: [],
})
export class LoginModule {}
