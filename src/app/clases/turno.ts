export class Turno{
    esptaNombre: any;
    esptaApellido: any;
    esptaEmail: any;
    esptaDni: any;
    pacNombre: any;
    pacApellido: any;
    pacEmail: any;
    pacDni: any;
    especialidad: any;
    diaSemana: any;
    dia: any;
    hora: any;
    clave: any;
    resenia: any;
    estado: any;

    constructor(esptaNombre: any, 
                esptaApellido: any,
                esptaEmail: any,
                esptaDni: any,
                especialidad: any,
                diaSemana: any, 
                dia: any, 
                hora: any){
        this.esptaNombre = esptaNombre;
        this.esptaApellido = esptaApellido;
        this.esptaEmail = esptaEmail;
        this.esptaDni = esptaDni;
        this.especialidad = especialidad,
        this.diaSemana = diaSemana,
        this.dia = dia;
        this.hora = hora;
    }

    turnoMasPaciente(turno: Turno, pacNombre: any, pacApellido: any, pacEmail: any, pacDni: any){
        turno.pacNombre= pacNombre;
        turno.pacApellido = pacApellido;
        turno.pacEmail = pacEmail;
        turno.pacDni = pacDni;
    }
}