import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { AlertService } from './alert.service';
import firebase from 'firebase/compat/app';
import { Auth } from '@angular/fire/auth';
import { ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { Usuario } from 'src/app/clases/usuario';
import { getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afauth: AngularFireAuth,
    private router: Router,
    // private readonly auth: Auth,
    private st: StorageService,
    private alerta: AlertService
  ) {}

  getUsuarioLogueado() {
    return this.afauth.authState;
  }

  login(email: string, password: string) {
    this.afauth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        firebase
          .firestore()
          .collection('usuarios')
          .where('email', '==', email)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data()['verificado'] == 'true') {
                if (user.user?.emailVerified == true) {
                  console.log('¡Bienvenid@ ' + doc.data()['nombre'] + '!');
                  this.alerta.lanzarAlertaExito(
                    '¡Bienvenid@ ' + doc.data()['nombre'] + '!'
                  );
                  this.router.navigate(['/home']);
                  this.st.getUser(email);
                  this.st.getImages(email);
                  this.st.getImagenes(email);
                  // this.st.getListaHorarios(email);
                } else {
                  this.alerta.lanzarAlertaError('Confirme primero su mail.');
                  this.logout('/login');
                  console.log('aaaa else');
                }
              } else {
                console.log('aaaa 2');

                this.alerta.lanzarAlertaError(
                  'Espere a que un admin apruebe su usuario.'
                );
                this.logout('/login');
              }
              console.log(doc.data());
            });
          })
          .catch((error) => {
            console.log('aaaa cat');

            console.log('Error buscando: ', error);
          });
      })
      .catch((error) => {
        console.log('aaaa error', error);

        this.alerta.lanzarAlertaError(this.error(error.code));
      });
  }

  async registro(usuario: Usuario, archivos: any) {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      // url: `${window.location.protocol}//${window.location.host}/`,
      url: `http://clinica-tp-utn.firebaseapp.com/`,
      apiKey: 'AIzaSyAE_9PLW4nIs-4aGriqtWiWw-GrfRMW0k4',
      // This must be true.
      handleCodeInApp: true,
    };
    console.log(archivos);
    this.afauth
      .createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then((res) => {
        res.user?.sendEmailVerification();
        this.alerta.lanzarAlertaExito(
          'Pronto recibirá un mail para confirmar su mail.'
        );
        this.st.subirImagenes(usuario.email, archivos);
        this.st.addUsuario(usuario, archivos);
      })
      .catch((error) => {
        this.alerta.lanzarAlertaError(this.error(error.code));
      });
  }

  async updateUser(name: string, url: string) {
    let auth = getAuth();
    return await updateProfile(auth.currentUser!, {
      displayName: name,
      photoURL: url,
    })
      .then()
      .catch((err) => console.log(err));
  }

  error(error: string) {
    console.log(error);
    switch (error) {
      case 'auth/invalid-email':
        console.log('Correo inválido');
        return 'Correo inválido';
        break;
      case 'auth/email-already-in-use':
        console.log('Este correo ya está registrado');
        return 'Este correo ya está registrado';
        break;
      case 'auth/email-already-exists':
        console.log('Este correo ya está registrado');
        return 'Este correo ya está registrado';
        break;
      case 'auth/invalid-password':
        console.log('Contraseña inválida');
        return 'Contraseña inválida';
        break;
      case 'auth/weak-password':
        console.log(
          'Error, ingrese una contraseña que tenga mas de 5 carácteres'
        );
        return 'Error, ingrese una contraseña que tenga mas de 5 carácteres';
        break;

      case 'auth/internal-error':
        console.log('Error interno');
        return 'Error interno';
        break;
      case 'auth/too-many-requests':
        console.log('Muchas llamadas en poco tiempo');
        return 'Muchas llamadas en poco tiempo';
        break;
      case 'auth/missing-password':
        console.log('Ingrese la contraseña');
        return 'Ingrese la contraseña';
        break;
      case 'auth/user-not-found':
      case 'auth/invalid-login-credentials':
        console.log('Usuario no encontrado');
        return 'Usuario no encontrado';

        break;
      case 'auth/wrong-password':
        console.log('Contraseña incorrecta.');
        return 'Contraseña incorrecta.';
        break;
      case 'auth/invalid-email':
        console.log('El mail incorrecto.');
        return 'El mail incorrecto.';
        break;
      case 'auth/email-already-in-use':
        console.log('El mail ya está en uso.');
        return 'El mail ya está en uso.';
        break;

      default:
        console.log('Error desconocido');
        return 'Error desconocido';
        break;
    }
  }

  logout(redireccion: string) {
    this.afauth
      .signOut()
      .then((user) => {
        console.log('¡Adios!');
        // this.alerta.lanzarAlertaExito('¡Chau!');
        this.router.navigate([redireccion]);
        this.st.usuarioObj = new Usuario('', '', '', '', '', '', '', '', []);
      })
      .catch((error) => {
        this.alerta.lanzarAlertaError(':( ' + this.error(error.code));
      });
  }

  getAuth() {
    return this.afauth.authState;
  }

  async printCurrentUser() {
    this.getAuth().subscribe((res) => {
      //this.afauth.authState.subscribe(res => {
      console.log(res);
    });
  }

  // constructor(
  //   private afauth: AngularFireAuth,
  //   private storage: StorageService,
  //   private router: Router,
  //   private st: StorageService,
  //   private alerta: AlertService
  // ) {}

  // async login(email: string, password: string): Promise<string> {
  //   let mensaje: string = '';

  //   try {
  //     await this.afauth.signInWithEmailAndPassword(email, password);
  //     this.storage.addlog(email);
  //     this.storage.grabarTiempoSesionIniciada2(email);
  //     return mensaje;
  //   } catch (error: any) {
  //     switch (error.code) {
  //       case 'auth/invalid-email':
  //         mensaje = 'Correo inválido';
  //         console.log('Correo inválido');
  //         break;
  //       case 'auth/user-not-found':
  //         mensaje = 'Usuario no encontrado';
  //         console.log('Usuario no encontrado');
  //         break;
  //       case 'auth/wrong-password':
  //       case 'auth/missing-password':
  //         mensaje = 'Contraseña inválida';
  //         console.log('Contraseña inválida');
  //         break;
  //       case 'auth/internal-error':
  //         mensaje = 'Error interno';
  //         console.log('Error interno');
  //         break;
  //       case 'auth/too-many-requests':
  //         mensaje = 'Muchas llamadas en poco tiempo';
  //         console.log('Muchas llamadas en poco tiempo');
  //         break;
  //       default:
  //         mensaje = 'error.message';
  //         console.log(error);
  //         break;
  //     }
  //     return mensaje;
  //   }
  // }
  // async registro(
  //   nombre: string,
  //   email: string,
  //   password: string
  // ): Promise<string> {
  //   let mensaje: string = '';
  //   try {
  //     await this.afauth.createUserWithEmailAndPassword(email, password);
  //     this.storage.addUsuario(email);
  //     return mensaje;
  //   } catch (error: any) {
  //     switch (error.code) {
  //       case 'auth/invalid-email':
  //         mensaje = 'Correo inválido';
  //         console.log('Correo inválido');
  //         break;
  //       case 'auth/email-already-in-use':
  //         mensaje = 'Este correo ya está registrado';
  //         console.log('Este correo ya está registrado');
  //         break;
  //       case 'auth/email-already-exists':
  //         mensaje = 'Este correo ya está registrado';
  //         console.log('Este correo ya está registrado');
  //         break;
  //       case 'auth/invalid-password':
  //         mensaje = 'Contraseña inválida';
  //         console.log('Contraseña inválida');
  //         break;
  //       case 'auth/weak-password':
  //         mensaje =
  //           'Error, ingrese una contraseña que tenga mas de 5 carácteres';
  //         console.log(
  //           'Error, ingrese una contraseña que tenga mas de 5 carácteres'
  //         );
  //         break;
  //       case 'auth/internal-error':
  //         mensaje = 'Error interno';
  //         console.log('Error interno');
  //         break;
  //       case 'auth/too-many-requests':
  //         mensaje = 'Muchas llamadas en poco tiempo';
  //         console.log('Muchas llamadas en poco tiempo');
  //         break;
  //       default:
  //         mensaje = error.message;
  //         console.log(error.message);
  //         break;
  //     }
  //     return mensaje;
  //   }
  // }

  cerrarSesion() {
    this.afauth.signOut();
    console.log('usuario', this.afauth.currentUser);
    this.router.navigateByUrl('login');
  }
}
