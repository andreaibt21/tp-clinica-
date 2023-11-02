import { Injectable } from '@angular/core';
import { createCanvas, loadImage } from 'canvas'; 
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

constructor() { }

crearCaptcha() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let captcha = '';
  for (let q = 0; q < 6; q++) {
    if (q % 2 == 0) {
      captcha += characters.charAt(Math.floor(Math.random() * 26));
    } else {
      captcha += Math.floor(Math.random() * 10);
    }
  }
  return captcha;
}

async captcha(): Promise<boolean> {
  const canvasWidth = 200; // Ancho de la imagen
  const canvasHeight = 100; // Alto de la imagen
  const captchaFont = '24px Arial'; // Fuente y tamaño del texto del captcha

  // Generar el captcha y guardar la respuesta en una variable
  let captcha2 = this.crearCaptcha();

  // Crear un elemento canvas
  const canvas = createCanvas(canvasWidth, canvasHeight);

  // Obtener el contexto de dibujo
  const context = canvas.getContext('2d');

  // Establecer propiedades de estilo
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  context.font = captchaFont;
  context.fillStyle = 'black';

  // Dibujar el texto del captcha en el centro de la imagen
  context.fillText(captcha2, canvasWidth / 2 - 50, canvasHeight / 2 + 10);

  // Dibujar una línea en el medio de la imagen
  context.beginPath();
  context.moveTo(0, canvasHeight / 2);
  context.lineTo(canvasWidth, canvasHeight / 2);
  context.strokeStyle = 'black';
  context.stroke();

  // Convertir la imagen a escala de grises
  const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // rojo
    data[i + 1] = avg; // verde
    data[i + 2] = avg; // azul
  }
  context.putImageData(imageData, 0, 0);

  // Obtener la imagen en formato base64
  const imageBase64 = canvas.toDataURL();

  const { value: result } = await Swal.fire({
    title: 'Ingrese el código',
    html: `<img src="${imageBase64}" alt="Captcha" />`,
    input: 'text',
    text: '¡No sea un robot!',
    icon: 'info',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Confirmar',
    cancelButtonColor: '#d33',
    confirmButtonColor: '#198754',
    inputValidator: (value) => {
      if (!value || value !== captcha2) {
        return 'El código ingresado es incorrecto.';
      } else {
        return null;
      }
    }
  });

  if (result) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Captcha correcto',
      showConfirmButton: false,
      timer: 2000
    });
    return true;
  }
  return false;
}
}
