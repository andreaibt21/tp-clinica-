import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

constructor() { }

buscar(campo: any, valor: any, lista: any) //se envía a la tabla listaTurnos
{
  let listaBufer = [];
  console.log(campo);
  console.log(valor);
  if(campo != '' || valor != '')
  console.log('llega');
  {
    for(let i of lista)
    {
      console.log(i[campo]);
      var valorBufer = i[campo];
      // if(valorBufer == valor)
      // {
      //   listaBufer.push(i);
      // }
      // console.log("valorBufer",valorBufer);
      // console.log("valor",valor);
      if(valorBufer.includes(valor))
      {
        listaBufer.push(i);
      }
    }
    return listaBufer;
  }
  return lista;
}
}
