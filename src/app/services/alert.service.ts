import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

constructor() {
 }

 lanzarAlerta(icono: any, texto: String)
 {
   Swal.fire({
     icon: icono, //success, error, warning, info, question
     title: texto,
     showConfirmButton: false,
     timer: 1500
   })
 }

 lanzarAlertaExito(texto: String)
 {
  this.lanzarAlerta('success', texto);
 }


 lanzarAlertaError(texto: String)
 {
  this.lanzarAlerta('error', texto);
 }

 lanzarAlertaComun(texto: String)
 {
  Swal.fire({
    icon: 'info',
    title: texto,
    confirmButtonColor: '#198754'
  })
 }
}
