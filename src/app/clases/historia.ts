export class Historia{
    pacNombre: any;
    pacApellido: any;
    pacEmail: any;
    pacDni: any;
    altura: any;
    peso: any;
    temperatura: any;
    presion: any;
    datoUnoClave: any;
    datoUnoValor: any;
    datoDosClave: any;
    datoDosValor: any;
    datoTresClave: any;
    datoTresValor: any;
 
    constructor(pacNombre: any, pacApellido: any, pacEmail: any, pacDni: any, altura: any, peso: any, temperatura: any, presion: any, 
                datoUnoClave = '',
                datoUnoValor = '',
                datoDosClave = '',
                datoDosValor = '',
                datoTresClave = '',
                datoTresValor = '')
    {
        this.pacNombre = pacNombre;
        this.pacApellido = pacApellido;
        this.pacEmail = pacEmail;
        this.pacDni = pacDni;
        this.altura = altura;
        this.peso = peso;
        this.temperatura = temperatura;
        this.presion = presion;
        this.datoUnoClave = datoUnoClave,
        this.datoUnoValor = datoUnoValor,
        this.datoDosClave = datoDosClave,
        this.datoDosValor = datoDosValor,
        this.datoTresClave = datoTresClave,
        this.datoTresValor = datoTresValor
    }


}