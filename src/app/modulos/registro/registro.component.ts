import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { CaptchaService } from 'src/app/services/captcha.service';
import { Usuario } from 'src/app/clases/usuario';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  siteKey: string;
  archivos: FileList[] = [];
  form!: FormGroup;
  formd!: FormGroup;
  rol: string = '';
  esAdmin = false;
  especialidades: string[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private db: AuthService,
    private st: StorageService,
    public c: CaptchaService,
    private router: Router,
    private alerta: AlertService
  ) {
    this.siteKey = '6LetYBkpAAAAAPDo5QfXJtveQ35p_nmOMeVdskAo';
  }

  ngOnInit(): void {
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
      imagenDos: ['', [Validators.required]],
      recaptcha: ['', [Validators.required]],
    });
  }

  getValue(value: string): AbstractControl {
    return this.form.get(value) as FormGroup;
  }

  reset() {
    this.ngOnInit();
  }

  setRol(rol: string) {
    this.rol = rol;
  }

  setEsAdmin(esAdmin: any) {
    this.esAdmin = esAdmin;
  }

  atras() {
    this.rol = '';
  }

  cargarImagen($event: any) {
    const archivo = $event.target.files;
    this.archivos.push(archivo);
  }

  subirImagenes(usuario: string) {
    for (let index = 0; index < this.archivos.length; index++) {
      console.log(this.archivos[index]);
      this.st.subirImagen(usuario, this.archivos[index]);
    }
  }

  cargarEspecialidades() {
    if (this.form.value.gastroenterologia) {
      this.especialidades.push('Gastroenterología');
    }
    if (this.form.value.ginecologia) {
      this.especialidades.push('Ginecología');
    }
    if (this.form.value.clinica) {
      this.especialidades.push('Clinica');
    }
    if (this.form.value.especialidad) {
      this.especialidades.push(this.form.value.especialidad);
      this.st.addEspecialidad(this.form.value.especialidad);
    }
  }

  crearUsuario() {
    if (this.form.controls['recaptcha'].status == 'VALID') {
      if (
        this.form.controls['nombre'].status == 'VALID' &&
        this.form.controls['apellido'].status == 'VALID' &&
        this.form.controls['dni'].status == 'VALID' &&
        this.form.controls['edad'].status == 'VALID' &&
        this.form.controls['email'].status == 'VALID' &&
        this.form.controls['password'].status == 'VALID'
      ) {
        console.log('validoo');

        this.cargarEspecialidades();
        const usuario = new Usuario(
          this.form.value.nombre,
          this.form.value.apellido,
          this.form.value.dni,
          this.form.value.edad,
          this.form.value.email,
          this.form.value.password,
          this.rol,
          this.form.value.obraSocial,
          this.especialidades
        );
        this.db.registro(usuario, this.archivos).then(() => {
          if (!this.esAdmin) {
            console.log('no es admin');
            this.router.navigate(['/home-espera']);
            this.form.reset();
          } else {
            console.log('si es admin');
            this.router.navigate(['/home']);
          }
        });
      } else {
        this.alerta.lanzarAlertaError(
          'Por favor llene el formulario correctamente'
        );
      }
    } else {
      this.alerta.lanzarAlertaError('Por favor verifique que no es un robot');
    }
  }
}
