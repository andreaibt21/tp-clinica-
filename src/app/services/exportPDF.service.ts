import { Injectable } from '@angular/core';
import { Historia } from 'src/app/clases/historia';
import { Turno } from 'src/app/clases/turno';

import * as moment from 'moment';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class ExportPDFService {
  constructor() {}

  exportHistoria(h: Historia) {
    var line = 70;
    let PDF = new jsPDF('p', 'mm', 'a4');
    let pageHeight = PDF.internal.pageSize.height - 10;
    PDF.addImage('../../assets/logo.png', 'PNG', 10, 10, 25, 25);
    const date = new Date().toLocaleString();
    //cabecera
    PDF.text(`Clínica`, 70, 20);
    PDF.text(`${date}`, 150, 10);
    // PDF.text(`Historial de turnos de ${h.pacNombre} ${h.pacApellido}`, 70, 30);
    PDF.text(`Historia Clínica de ${h.pacNombre} ${h.pacApellido}`, 70, 30);
    line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
    //datos
    PDF.text(`- Altura: ${h.altura} cm.`, 15, line);
    line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
    PDF.text(`- Peso: ${h.peso} Kg.`, 15, line);
    line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
    PDF.text(`- Temperatura: ${h.temperatura} ºC`, 15, line);
    line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
    PDF.text(`- Presión: ${h.temperatura}`, 15, line);
    line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
    PDF.text(`-----------------------------------------------------`, 15, line);
    line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);

    //otros datos
    PDF.text(`OTROS DATOS`, 15, line);
    line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
    if (h.datoUnoClave != '') {
      PDF.text(`- ${h.datoUnoClave}: ${h.datoUnoValor}`, 15, line);
      line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
      if (h.datoDosClave != '') {
        PDF.text(`- ${h.datoDosClave}: ${h.datoDosValor}`, 15, line);
        line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
        if (h.datoTresClave != '') {
          PDF.text(`- ${h.datoTresClave}: ${h.datoTresValor}`, 15, line);
          line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
        }
      }
    }
    PDF.save('historia-clínica.pdf');
  }

  exportTurnos(lista: Turno[], especialidad = '', pacEmail = '', nombre = '') {
    var line = 70;
    let PDF = new jsPDF('p', 'mm', 'a4');
    let pageHeight = PDF.internal.pageSize.height - 10;
    PDF.addImage('../../assets/logo.png', 'PNG', 10, 10, 25, 25);
    const date = new Date().toLocaleString();
    //cabecera
    PDF.text(`Clínica `, 70, 20);
    PDF.text(`${date}`, 150, 10);
    PDF.text(`Turnos de: ${nombre}`, 70, 30);
    line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
    //datos
    if (especialidad != '') {
      PDF.text(`ESPECIALIDAD: ${especialidad}`, 15, line);
      line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
    }

    for (let t of lista) {
      if (especialidad != '' && t.especialidad == especialidad) {
        PDF.text(
          `-> Dr: ${t.esptaNombre} ${t.esptaApellido} - ${t.dia} ${t.hora} - ${t.estado} `,
          15,
          line
        );
        line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
      } else if (pacEmail != '' && t.pacEmail == pacEmail) {
        PDF.text(
          `-> Dr: ${t.esptaNombre} ${t.esptaApellido} - ${t.dia} ${t.hora}`,
          15,
          line
        );
        line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
      }
    }
    PDF.save('turnos.pdf');
  }

  exportHistoriadeTurnos(lista: Turno[], nombre = '') {
    var line = 70;
    let PDF = new jsPDF('p', 'mm', 'a4');
    let pageHeight = PDF.internal.pageSize.height - 10;
    PDF.addImage('../../assets/logo.png', 'PNG', 10, 10, 25, 25);
    const date = new Date().toLocaleString();
    //cabecera
    PDF.text(`Clínica`, 70, 20);
    PDF.text(`${date}`, 150, 10);
    // PDF.text(`Historial de turnos de ${h.pacNombre} ${h.pacApellido}`, 70, 30);
    PDF.text(`Historia Clínica de ${nombre}`, 70, 30);
    line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);

    for (let t of lista) {

      PDF.text(
        `-> Dr: ${t.esptaNombre} ${t.esptaApellido} - ${t.dia} ${t.hora} - ${t.estado} `,
        15,
        line
      );
      line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
      if ( typeof t.historia !== "string") {
        //datos
        PDF.text(`- Altura: ${t.historia.altura} cm.`, 15, line);
        line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
        PDF.text(`- Peso: ${t.historia.peso} Kg.`, 15, line);
        line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
        PDF.text(`- Temperatura: ${t.historia.temperatura} ºC`, 15, line);
        line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
        PDF.text(`- Presión: ${t.historia.temperatura}`, 15, line);
        line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
        PDF.text(
          `-----------------------------------------------------`,
          15,
          line
        );
        line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);

        //otros datos
        PDF.text(`OTROS DATOS`, 15, line);
        line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
        if (t.historia.datoUnoClave != '') {
          PDF.text(            `- ${t.historia.datoUnoClave}: ${t.historia.datoUnoValor}`,15,line          );
          line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
          if (t.historia.datoDosClave != '') {
            PDF.text(              `- ${t.historia.datoDosClave}: ${t.historia.datoDosValor}`,15,line            );
            line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
            if (t.historia.datoTresClave != '') {
              PDF.text(                `- ${t.historia.datoTresClave}: ${t.historia.datoTresValor}`,15,line              );
              line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
            }
          }
          PDF.text(
            `--------------------------------------------------------------`,
            15,
            line
          );
        }
      }else{
        PDF.text(`No tiene historia`, 15, line);
        line > pageHeight ? (PDF.addPage(), (line = 20)) : (line += 10);
        PDF.text(
          `--------------------------------------------------------------`,
          30,
          line
        );

      }
      PDF.addPage('p', 'p')
    }
    PDF.save('historia-clínica-turnos.pdf');
  }
}
