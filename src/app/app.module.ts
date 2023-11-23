import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {
  AngularFireStorage,
  AngularFireStorageModule,
} from '@angular/fire/compat/storage';
import { provideStorage } from '@angular/fire/storage';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { CommonModule, UpperCasePipe } from '@angular/common';

import { ErrorComponent } from './componentes/error/error.component';
import { Error404Component } from './componentes/error404/error404.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';

import { InicioComponent } from './modulos/inicio/inicio.component';
import { StorageService } from './services/storage.service';

import { HorariosEsptaPipe } from './pipes/horarios-espta.pipe';
import { FechaHoraTurnoPipe } from './pipes/fechahora-turno.pipe';
import { NombreEsptaTurnoPipe } from './pipes/nombreEspta-turno.pipe';
import { GestionTurnoEsptaComponent } from './modulos/gestion-turno-espta/gestion-turno-espta.component';
import { TablaTurnosComponent } from './componentes/tabla-turnos/tabla-turnos.component';
import { ListaEspecialidadesComponent } from './componentes/lista-especialidades/lista-especialidades.component';
import { ListaEspecialistasComponent } from './componentes/lista-especialistas/lista-especialistas.component';
import { ListaTurnosComponent } from './componentes/lista-turnos/lista-turnos.component';
import { SacarTurnoComponent } from './modulos/sacar-turno/sacar-turno.component';
import { MiPerfilComponent } from './modulos/mi-perfil/mi-perfil.component';
import { GestionTurnoPacComponent } from './modulos/gestion-turno-pac/gestion-turno-pac.component';
import { RegistroHistoriaComponent } from './modulos/registro-historia/registro-historia.component';
import { CancelarTurnoComponent } from './modulos/cancelar-turno/cancelar-turno.component';
import { HistoriaClinicaComponent } from './componentes/historia-clinica/historia-clinica.component';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { UsuariosComponent } from './modulos/usuarios/usuarios.component';
import { CardsUsuariosComponent } from './componentes/cards-usuarios/cards-usuarios.component';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { PacientesComponent } from './modulos/pacientes/pacientes.component';

const firebaseConfig = {
  apiKey: 'AIzaSyAE_9PLW4nIs-4aGriqtWiWw-GrfRMW0k4',
  authDomain: 'clinica-tp-utn.firebaseapp.com',
  projectId: 'clinica-tp-utn',
  storageBucket: 'clinica-tp-utn.appspot.com',
  messagingSenderId: '376270065094',
  appId: '1:376270065094:web:4d2cb0d351ded6d14176c7',
};

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    Error404Component,
    NavbarComponent,
    InicioComponent,
    GestionTurnoEsptaComponent,
    TablaTurnosComponent,
    ListaEspecialistasComponent,
    ListaEspecialidadesComponent,
    ListaTurnosComponent,
    SacarTurnoComponent,
    HorariosEsptaPipe,
    FechaHoraTurnoPipe,
    NombreEsptaTurnoPipe,
    MiPerfilComponent,
    GestionTurnoPacComponent,
    RegistroHistoriaComponent,
    CancelarTurnoComponent,
    HistoriaClinicaComponent,
    ListaUsuariosComponent,
    UsuariosComponent,
    CardsUsuariosComponent,
    SpinnerComponent,
    PacientesComponent

  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    UpperCasePipe,
  ],
  providers: [StorageService, UpperCasePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
