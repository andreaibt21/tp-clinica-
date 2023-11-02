export class Horario{
    nombre: any;
    email: any;
    clave: any; //email_diasemana
    diaSemana: any;
    horaDesde: any;
    horaHasta: any;

    constructor(nombre: any,
        email: any,
        clave: any, //email_diasemana
        diaSemana: any,
        horaDesde = '',
        horaHasta = ''){
            this.nombre = nombre;
            this.email = email;
            this.clave = clave;
            this.diaSemana = diaSemana;
            this.horaDesde = horaDesde;
            this.horaHasta = horaHasta;
        }

   




}