import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { serverTimestamp } from 'firebase/firestore';
import { AlertService } from './alert.service';
import { Usuario } from 'src/app/clases/usuario';
import {
  ref,
  Storage,
  uploadBytes,
  listAll,
  getDownloadURL,
} from '@angular/fire/storage';
import { AuthService } from './auth.service';
import { Horario } from 'src/app/clases/horario';
import { Turno } from 'src/app/clases/turno';
import { formatDate } from '@angular/common';
import { Historia } from 'src/app/clases/historia';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  usuario: any;
  horario: any;
  historia: any;
  turno: any;
  coleccion: string = 'usuarios';
  public listaUrldelMismo: string[] = [];
  public listaUrlParaVarios: string[] = [];
  public usuarioObj: any;
  public listaItems: [] = [];
  public listaHorarios: Horario[] = [];

  constructor(
    private db: AngularFirestore,
    private alerta: AlertService,
    public st: Storage // public auth: AuthService
  ) {}

  public async addUsuario(usuario: Usuario, archivos: any) {
    var verificado;
    // creado: formatDate(new Date(), 'dd-MMM-yyyy hh:mm:ss a', 'en-US');
    usuario.rol == 'Especialista'
      ? (verificado = 'false')
      : (verificado = 'true');
    this.usuario = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      dni: usuario.dni,
      edad: usuario.edad,
      email: usuario.email,
      password: usuario.password,
      obraSocial: usuario.obraSocial,
      especialidad: usuario.especialidad,
      rol: usuario.rol,
      verificado: verificado,
      // photoUrl: usuario.photoUrl,
      // imageUrl: usuario.imageUrl,
      creado: formatDate(new Date(), 'dd-MMM-yyyy hh:mm:ss a', 'en-US'),
      log: formatDate(new Date(), 'dd-MMM-yyyy hh:mm:ss a', 'en-US'),
    };
    console.log(this.usuario);
    this.db
      .collection(this.coleccion)
      .add(this.usuario)
      .then(() => {
        console.log('Se graba el usuario: ', usuario);
      })
      .catch((error) => {
        this.alerta.lanzarAlertaError(error);
      });
  }

  public async addEspecialidad(especialidad: string) {
    firebase
      .firestore()
      .collection('especialidades')
      .where('nombre', '==', especialidad)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size == 0) {
          this.db
            .collection('especialidades')
            .add({ nombre: especialidad })
            .then(() => {
              console.log('Se graba la especialidad: ', especialidad);
            })
            .catch((error) => {
              console.log('Error grabando: ', error);
            });
        }
      })
      .catch((error) => {
        console.log('Error grabando: ', error);
      });
  }

  async subirImagenes(usuario: string, archivos: any) {
    console.log(archivos[0]);
    console.log(archivos[1]);
    for (let index = 0; index < archivos.length; index++) {
      this.subirImagen(usuario, archivos[index]);
    }
  }

  async subirImagen(usuario: string, archivos: any) {
    console.log(archivos);
    const imgRef = ref(
      this.st,
      'images/' + usuario + '/' + new Date().getTime().toString()
    );
    const element = archivos[0];
    console.log(element);
    const metadata = {
      contentType: 'image',
    };
    await uploadBytes(imgRef, element)
      .then()
      .catch((error) => console.log(error));
  }

  async getImages(user: any) {
    this.listaUrldelMismo = [];
    const storage = firebase.storage();
    const imagesRef = storage.ref('images/' + user);
    await listAll(imagesRef)
      .then(async (res) => {
        for (let item of res.items) {
          await getDownloadURL(item).then((res) => {
            this.listaUrldelMismo.push(res);
          });
        }
      })
      .catch((error) => console.log(error));
  }

  async getImagenes(users: any) {
    this.listaUrlParaVarios = [];
    for (let i = 0; i < users.length; i++) {
      const storage = firebase.storage();
      const imagesRef = storage.ref('images/' + users[i]);
      await listAll(imagesRef).then(async (res) => {
        await getDownloadURL(res.items[0]).then((res) => {
          this.listaUrlParaVarios.push(res);
        });
      });
    }
  }

  getCollection(coleccion: string, ordenadaPor: string) {
    return this.db
      .collection(coleccion, (ref) => ref.orderBy(ordenadaPor, 'asc'))
      .valueChanges();
  }

  aprobarUser(mail: string) {
    firebase
      .firestore()
      .collection(this.coleccion)
      .where('email', '==', mail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            verificado: 'true',
          });
        });
      })
      .catch((error) => {
        console.log('Error grabando: ', error);
      });
  }

  async getUser(mail: any) {
    this.usuarioObj = new Usuario('', '', '', '', '', '', '', '', []);
    firebase
      .firestore()
      .collection(this.coleccion)
      .where('email', '==', mail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.usuarioObj = new Usuario(
            doc.data()['nombre'],
            doc.data()['apellido'],
            doc.data()['dni'],
            doc.data()['edad'],
            doc.data()['email'],
            '',
            doc.data()['rol'],
            doc.data()['obraSocial'],
            doc.data()['especialidad']
          );
        });
      })
      .catch((error) => {
        console.log('Error grabando: ', error);
      });
  }

  public async addHorario(horario: Horario) {
    this.horario = {
      nombre: horario.nombre,
      email: horario.email,
      clave: horario.clave,
      diaSemana: horario.diaSemana,
      horaHasta: horario.horaHasta,
      horaDesde: horario.horaDesde,
      creado: serverTimestamp(),
      log: serverTimestamp(),
    };

    this.db
      .collection('horarios')
      .add(this.horario)
      .then(() => {
        console.log('Se graba el horario: ', horario.clave);
      })
      .catch((error) => {
        console.log('Errror grabando el horario: ', error);
      });
  }

  public async addHistoria(h: Historia) {
    this.historia = {
      pacNombre: h.pacNombre,
      pacApellido: h.pacApellido,
      pacEmail: h.pacEmail,
      pacDni: h.pacDni,
      altura: h.altura,
      peso: h.peso,
      temperatura: h.temperatura,
      presion: h.presion,
      datoUnoClave: h.datoUnoClave,
      datoUnoValor: h.datoUnoValor,
      datoDosClave: h.datoDosClave,
      datoDosValor: h.datoDosValor,
      datoTresClave: h.datoTresClave,
      datoTresValor: h.datoTresValor,
    };

    this.db
      .collection('historias')
      .add(this.historia)
      .then(() => {
        console.log('Se graba la historia de: ', h.pacDni);
      })
      .catch((error) => {
        console.log('Error grabando la historia: ', error);
      });
  }

  public async modificarHistoria(h: Historia) {
    firebase
      .firestore()
      .collection('historias')
      .where('pacEmail', '==', h.pacEmail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .update({
              altura: h.altura,
              peso: h.peso,
              presion: h.presion,
              temperatura: h.temperatura,
              datoUnoClave: h.datoUnoClave,
              datoUnoValor: h.datoUnoValor,
              datoDosClave: h.datoDosClave,
              datoDosValor: h.datoDosValor,
              datoTresClave: h.datoTresClave,
              datoTresValor: h.datoTresValor,
            })
            .then(() => {
              console.log('Se actualizó la historia ' + h.pacEmail);
            });
        });
      })
      .catch((error) => {
        console.log('Error grabando: ', error);
      });
  }

  public async addTurno(turno: Turno) {
    // console.log(turno);
    var clave = turno.esptaEmail + '_' + turno.dia + '_' + turno.hora;
    this.turno = {
      esptaNombre: turno.esptaNombre,
      esptaApellido: turno.esptaApellido,
      esptaEmail: turno.esptaEmail,
      esptaDni: turno.esptaDni,
      pacNombre: turno.pacNombre,
      pacApellido: turno.pacApellido,
      pacEmail: turno.pacEmail,
      pacDni: turno.pacDni,
      especialidad: turno.especialidad,
      diaSemana: turno.diaSemana,
      dia: turno.dia,
      hora: turno.hora,
      clave: clave,
      estado: 'pendiente',
      resenia: '',
      motivo_cancel: '',
      motivo_rechazo: '',
    };

    this.db
      .collection('turnos')
      .add(this.turno)
      .then(() => {
        console.log('Se graba el turno: ', clave);
      })
      .catch((error) => {
        console.log('Errror grabando el turno: ', error);
      });
  }

  public async addHorarioConValidacion(horario: Horario) {
    firebase
      .firestore()
      .collection('horarios')
      .where('clave', '==', horario.clave)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size == 0) {
          this.addHorario(horario);
        } else {
          querySnapshot.forEach((doc) => {
            doc.ref
              .update({
                horaHasta: horario.horaHasta,
                horaDesde: horario.horaDesde,
                log: serverTimestamp(),
              })
              .then(() => {
                console.log('Se actualizó ' + horario.clave);
              });
          });
        }
      })
      .catch((error) => {
        console.log('Error grabando: ', error);
      });
  }

  reseniarTurno(t: Turno, resenia: string) {
    firebase
      .firestore()
      .collection('turnos')
      .where('clave', '==', t.clave)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .update({
              resenia: resenia,
            })
            .then(() => {
              this.alerta.lanzarAlertaExito('Turno reseñado.');
            });
        });
      })
      .catch((error) => {
        console.log('Error cancelando: ', error);
      });
  }
  public listaturnos: any[] = [];

  getTurnos(mail: string) {
    firebase
      .firestore()
      .collection('turnos')
      .where('pacEmail', '==', mail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.listaturnos.push(doc.data());
        });
      })
      .catch((error) => {
        console.log('Error get turno', error);
      });
    console.log('this.listaturnos', this.listaturnos);
  }

  cambiarEstadoTurno(t: Turno, accion: string, motivo = '') {
    firebase
      .firestore()
      .collection('turnos')
      .where('clave', '==', t.clave)
      .get()
      .then((querySnapshot) => {
        if (accion == 'cancelar') {
          querySnapshot.forEach((doc) => {
            doc.ref
              .update({
                estado: 'cancelado',
                motivo_cancel: motivo,
              })
              .then(() => {
                this.alerta.lanzarAlertaExito('Turno cancelado.');
              });
          });
        } else if (accion == 'rechazar') {
          querySnapshot.forEach((doc) => {
            doc.ref
              .update({
                estado: 'rechazado',
                motivo_rechazo: motivo,
              })
              .then(() => {
                this.alerta.lanzarAlertaExito('Turno rechazado.');
              });
          });
        } else if (accion == 'aceptar') {
          querySnapshot.forEach((doc) => {
            doc.ref
              .update({
                estado: 'aceptado',
              })
              .then(() => {
                this.alerta.lanzarAlertaExito('Turno aceptado.');
              });
          });
        } else if (accion == 'finalizar') {
          querySnapshot.forEach((doc) => {
            doc.ref
              .update({
                estado: 'finalizado',
                resenia: motivo,
              })
              .then(() => {
                this.alerta.lanzarAlertaExito('Turno finalizado.');
              });
          });
        }
      })
      .catch((error) => {
        console.log('Error cancelando: ', error);
      });
  }

  ///VIEJAS
  actualizarDato(mail: string, campo: any, nuevoDato: any) {
    firebase
      .firestore()
      .collection(this.coleccion)
      .where('email', '==', mail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const campoAux = campo;
          doc.ref.update({
            campoAux: nuevoDato,
          });
        });
      })
      .catch((error) => {
        console.log('Error grabando: ', error);
      });
  }

  grabarLog(mail: string) {
    this.actualizarDato(
      mail,
      'log',
      formatDate(new Date(), 'dd-MMM-yyyy hh:mm:ss a', 'en-US')
    );
  }
}
