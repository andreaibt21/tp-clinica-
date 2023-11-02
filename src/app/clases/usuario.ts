export class Usuario {
    
    nombre: any;
    apellido: any;
    dni: any;
    edad: any;
    email: any;
    password: any;
    rol: any;
    obraSocial: any;
    especialidad: string[] = []    // photoUrl: string;
    // imageUrl: string[] = [];


    constructor(nombre: any,
                apellido: any,
                dni: any,
                edad: any,
                email: any,
                password: any,
                rol: any,
                obraSocial = '',
                especialidad: string[] = [],
                // photoUrl = '',
                // imageUrl = []
                ){
            this.nombre = nombre;
            this.apellido = apellido;
            this.dni = dni;
            this.edad = edad;
            this.email = email;
            this.password = password;
            this.rol = rol;
            this.obraSocial = obraSocial;
            this.especialidad = especialidad;
            // this.photoUrl = photoUrl;
            // this.imageUrl = imageUrl;
        }
      
}