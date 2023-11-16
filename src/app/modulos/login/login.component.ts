import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginUsuario: FormGroup;
  user: string = '';
  mostrar: boolean = false;
  interval: any;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private st: StorageService
  ) {
    this.loginUsuario = this.fb.group({
      email: [this.user, Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;
    // this.startTimer()
    this.auth.login(email, password);
  }

  setUser(user: string) {
    this.loginUsuario = this.fb.group({
      email: [user],
      password: ['123456'],
    });
  }

  AccesoDirectoAdmin() {
    // this.startTimer()

    this.loginUsuario.value.email = '16-10152@usb.ve';
    this.loginUsuario.value.password = '123456';
    console.log( this.loginUsuario);
  }
  AccesoDirectoEspecialista() {
    // this.startTimer()

    this.loginUsuario.value.email = 'jaco.9419@gmail.com';
    this.loginUsuario.value.password = '123456';
    console.log( this.loginUsuario);
  }
  AccesoDirectoPaciente1() {
    // this.startTimer()

    this.loginUsuario.value.email = 'andreaixabella@gmail.com';
    this.loginUsuario.value.password = '123456';
    console.log( this.loginUsuario);
  }






}
