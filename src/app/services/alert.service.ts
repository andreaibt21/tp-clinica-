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
     timer: 2000
   })
 }

 lanzarAlertaExito(texto: String)
 {
  this.lanzarAlerta('success', texto);
 }

 lanzarAlertaLoading()
 {
  Swal.fire({
    imageUrl: "../../assets/gato.svg",
    imageHeight: 150,
    width: 250,
    imageAlt: "spinner",
    showConfirmButton: false,
    timer: 2000,
    backdrop: "rgba(228, 162, 20, 0.300)",
    background:"rgba(228, 162, 20)"

  });
 }
 lanzarMensajeTurnos(to: any)
 {
  console.log(to);
  if(to.length == 0)(
  Swal.fire({
    icon: 'info',
    title: "El usuario no tiene turnos finalizados",
    confirmButtonColor: '#198754'
  })
  )
   let html = '<br><b>'+to[0].pacNombre+' '+to[0].pacApellido+'</b><br>';
   for(let i = 0 ; i < to.length; i++)
   {
    console.log("entra?");
    let cadena = '<br>'+to[i].dia+' '+to[i].hora+'<br>';
    console.log(cadena);
    html = html.concat(cadena);
   }

   console.log(html)


   Swal.fire({
     title: 'Últimos turnos ',
     text: to[0].pacNombre+to[0].pacApellido,
     html: html,
     showConfirmButton: true,
     confirmButtonColor: '#198754',
     showClass: {
      popup: 'animate__animated animate__fadeInDown'
      },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
      }
   })
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
