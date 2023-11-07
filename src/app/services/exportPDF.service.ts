import { Injectable } from '@angular/core';
import { Historia } from 'src/app/clases/historia';
import { Turno } from 'src/app/clases/turno';

import * as moment from 'moment';
import jsPDF from 'jspdf';



@Injectable({
  providedIn: 'root'
})
export class ExportPDFService {

constructor() {}

 exportHistoria(h: Historia){
  var line = 70;
  let PDF = new jsPDF('p', 'mm', 'a4',);
  let pageHeight = (PDF.internal.pageSize.height) - 10;
  PDF.addImage('../../assets/icono.png', 'PNG', 10, 10, 25, 25);
  const date = new Date().toLocaleString();
  //cabecera
  PDF.text(`Clínica Dr. Rus`, 70, 20);
  PDF.text(`${date}`, 150, 10);
  // PDF.text(`Historial de turnos de ${h.pacNombre} ${h.pacApellido}`, 70, 30);
  PDF.text(`Historia Clínica de ${h.pacNombre} ${h.pacApellido}`, 70, 30);
  (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
  //datos
  PDF.text(`- Altura: ${h.altura} cm.`, 15, line);
  (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
  PDF.text(`- Peso: ${h.peso} Kg.`, 15, line);
  (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
  PDF.text(`- Temperatura: ${h.temperatura} ºC`, 15, line);
  (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
  PDF.text(`- Presión: ${h.temperatura}`, 15, line);
  (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
  PDF.text(`-----------------------------------------------------`, 15, line);
  (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;

  //otros datos
  PDF.text(`OTROS DATOS`, 15, line);
  (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
  if(h.datoUnoClave != '')
  {
    PDF.text(`- ${h.datoUnoClave}: ${h.datoUnoValor}`, 15, line);
    (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
    if(h.datoDosClave != '')
    {
      PDF.text(`- ${h.datoDosClave}: ${h.datoDosValor}`, 15, line);
      (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
      if(h.datoTresClave != '')
      {
        PDF.text(`- ${h.datoTresClave}: ${h.datoTresValor}`, 15, line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
      }
    }
  }
  PDF.save('historia-clínica.pdf'); 
 }

 exportTurnos(lista: Turno[], especialidad = '', pacEmail = ''){
  var line = 70;
  let PDF = new jsPDF('p', 'mm', 'a4',);
  let pageHeight = (PDF.internal.pageSize.height) - 10;
  PDF.addImage('../../assets/icono.png', 'PNG', 10, 10, 25, 25);
  const date = new Date().toLocaleString();
  //cabecera
  PDF.text(`Clínica Dr. Rus`, 70, 20);
  PDF.text(`${date}`, 150, 10);
  PDF.text(`Turnos de: ${lista[0].pacNombre} ${lista[0].pacApellido}`, 70, 30);
  (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
  //datos
  if(especialidad != ''){
    PDF.text(`ESPECIALIDAD: ${especialidad}`, 15, line);
    (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
  }

  for(let t of lista)
  {
    if(especialidad != '' && t.especialidad == especialidad)
    {
        PDF.text(`-> Dr: ${t.esptaNombre} ${t.esptaApellido} - ${t.dia} ${t.hora} - ${t.estado} `, 15, line) ;
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
    }
    else if(pacEmail != '' && t.pacEmail == pacEmail)
    {
      PDF.text(`-> Dr: ${t.esptaNombre} ${t.esptaApellido} - ${t.dia} ${t.hora}`, 15, line) ;
      (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
    }
  } 
  PDF.save('turnos.pdf'); 
 }

}
