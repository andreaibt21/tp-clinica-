import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { provideStorage } from '@angular/fire/storage';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


import { ErrorComponent } from './componentes/error/error.component';
import { Error404Component } from './componentes/error404/error404.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { HacerAnonSiNullPipe } from './pipes/hacerAnonSiNull.pipe';
import { InicioComponent } from './modulos/inicio/inicio.component';
import { StorageService } from './services/storage.service';



const firebaseConfig = {
  apiKey: "AIzaSyAE_9PLW4nIs-4aGriqtWiWw-GrfRMW0k4",
  authDomain: "clinica-tp-utn.firebaseapp.com",
  projectId: "clinica-tp-utn",
  storageBucket: "clinica-tp-utn.appspot.com",
  messagingSenderId: "376270065094",
  appId: "1:376270065094:web:4d2cb0d351ded6d14176c7"
};

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    Error404Component,
    NavbarComponent,
    InicioComponent,


  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideStorage(()=>getStorage()),
    BrowserAnimationsModule,

  ],
  providers: [StorageService, HacerAnonSiNullPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
