import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  constructor() {}

  buscar(
    campo: any,
    valor: any,
    lista: any //se envía a la tabla listaTurnos
  ) {
    let listaBufer = [];
    console.log(campo);
    console.log(valor);
    if (campo != '' || valor != '') console.log('llega');
    {
      for (let i of lista) {
        console.log(i[campo]);
        var valorBufer = i[campo];
        // if(valorBufer == valor)
        // {
        //   listaBufer.push(i);
        // }
        // console.log("valorBufer",valorBufer);
        // console.log("valor",valor);
        if (valorBufer.toLowerCase().includes(valor.toLowerCase())) {
          listaBufer.push(i);
        }
      }
      return listaBufer;
    }
    return lista;
  }

  buscarHI(
    campo: any,
    valor: any,
    lista: any //se envía a la tabla listaTurnos
  ) {
    let listaBufer = [];
    console.log('campo', campo);
    console.log('valor', valor);
    console.log('lista', lista);
    if (campo != '' || valor != '') {
      listaBufer = lista.filter((elemento: any) => {
        const historiaStr =
          typeof elemento.historia !== 'string'
            ? JSON.stringify(elemento.historia)
            : elemento.historia;
        return historiaStr.toLowerCase().includes(valor.toLowerCase());
      });
    }
    console.log('listaBufer', listaBufer);

    return listaBufer;
  }
}
