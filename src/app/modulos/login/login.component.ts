import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {


  loginUsuario: FormGroup;
  user: string = '';

  constructor(private auth: AuthService, private fb:FormBuilder, private st:StorageService){
      this.loginUsuario = this.fb.group({
        email:[this.user, Validators.required],
        password:['', Validators.required],
        })
    }

ngOnInit() {

  }

  login () {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;
    this.auth.login(email, password);
  }

  setUser(user: string){
    this.loginUsuario = this.fb.group({
      email: [user],
      password: ['123456'],
    });
  }



  // public usuario = {
  //   email: '',
  //   password: '',
  // };
  // public error: boolean = false;
  // public mensaje: string = '';

  // constructor(private AuthService: AuthService, private router: Router) {}
  // Ingresar() {
  //   console.log(this.usuario);
  //   const { email, password } = this.usuario;
  //   // this.AuthService.login(email, password).then((res) => {
  //   //   if (res !== '') {
  //   //     this.error = true;
  //   //     this.mensaje = res;
  //   //     console.log('errooooor login');
  //   //  //   console.log(res);
  //   //   } else {
  //   //     this.error = false;
  //   //     this.router.navigateByUrl('home');
  //   //   //  console.log('se logueó', res);
  //   //   }});

  // }

  // AccesoDirecto() {
  //   console.log(this.usuario);
  //   this.usuario.email = 'test@gmail.com';
  //   this.usuario.password = '123456';
  // }
}
