import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { CaptchaService } from 'src/app/services/captcha.service';
import { Usuario } from 'src/app/clases/usuario';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {

  archivos: FileList[] = [];
  form!: FormGroup;
  formd!: FormGroup;
  rol: string = '';
  esAdmin = false;
  especialidades: string[] = [];

  constructor(private readonly fb: FormBuilder,
              private db: AuthService,
           private st: StorageService,
              public c: CaptchaService,
              private router: Router

              ) { }

  ngOnInit() : void {
    this.form = this.fb.group({
      rol: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      nombre: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      apellido: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      edad: ['', [Validators.required, Validators.max(100)]],
      dni: ['', [Validators.minLength(8), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      obraSocial: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      especialidad: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      gastroenterologia: [''],
      ginecologia: [''],
      clinica: [''],
      imagenUno: ['', [Validators.required]],
      imagenDos: ['', [Validators.required]]
    })
  }

  getValue(value: string): AbstractControl {
    return this.form.get(value) as FormGroup;
  }

  reset() {
    this.ngOnInit();
  }

  setRol(rol: string)
  {
    this.rol = rol;
  }

  setEsAdmin(esAdmin: any)
  {
    this.esAdmin = esAdmin;
  }

  atras()
  {
    this.rol = '';
  }

  cargarImagen($event: any) {
     const archivo = $event.target.files;
     this.archivos.push(archivo);
  }

  subirImagenes(usuario: string)
  {
    for (let index = 0; index < this.archivos.length; index++){
      console.log(this.archivos[index]);
      this.st.subirImagen(usuario, this.archivos[index]);
    }
  }

  cargarEspecialidades()
  {
    if(this.form.value.gastroenterologia){this.especialidades.push("Gastroenterología");}
    if(this.form.value.ginecologia)      {this.especialidades.push('Ginecología');}
    if(this.form.value.clinica)          {this.especialidades.push('Clinica');}
    if(this.form.value.especialidad)     {this.especialidades.push(this.form.value.especialidad);
                                          this.st.addEspecialidad(this.form.value.especialidad);
                                        }
  }

  crearUsuario(){
    this.c.captcha().then(res=> {
      if(res){
        this.cargarEspecialidades();
        const usuario = new Usuario(this.form.value.nombre,
                                      this.form.value.apellido,
                                      this.form.value.dni,
                                      this.form.value.edad,
                                      this.form.value.email,
                                      this.form.value.password,
                                      this.rol,
                                      this.form.value.obraSocial,
                                      this.especialidades);
        this.db.registro(usuario, this.archivos).then(()=>{
          if(this.esAdmin)
          {
            this.router.navigate(['/home']);
          }
          else
          {
            this.router.navigate(['/home-espera']);
          }

        });
      }
    })
  }





  // public usuario = {
  //   nombre: '',
  //   email: '',
  //   password: '',
  // };
  // public error: boolean = false;
  // public mensaje: string = '';

  // constructor(private AuthService: AuthService, private router: Router) {}

  // Registrar() {
  //   console.log(this.usuario);
  //   const { nombre, email, password } = this.usuario;
  //   this.AuthService.registro(nombre, email, password).then((res) => {
  //     if (res !== '') {
  //       this.error = true;
  //       this.mensaje = res;
  //      // console.log('errooooor');
  //      // console.log(res);
  //     } else {
  //       this.error = false;
  //     //  console.log('se registró', res);
  //       this.router.navigateByUrl('home');
  //     }
  //   });
  // }
}
