import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegistroComponent } from './registro.component';
import { RegistroRoutingModule } from './registro-routing.module';
import { PreRegistroComponent } from 'src/app/componentes/pre-registro/pre-registro.component';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ],
  exports: [RegistroComponent],
  declarations: [RegistroComponent, PreRegistroComponent],
  providers: [],
})
export class RegistroModule {}
