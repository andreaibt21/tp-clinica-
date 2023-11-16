import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Historia } from 'src/app/clases/historia';
import { Turno } from 'src/app/clases/turno';
import { FinalizarTurnoService } from 'src/app/services/finalizar-turno.service';

@Component({
  selector: 'app-registro-historia',
  templateUrl: './registro-historia.component.html',
  styleUrls: ['./registro-historia.component.css'],
})
export class RegistroHistoriaComponent implements OnInit {
  form!: FormGroup;
  @Input() turno: any;
  @Input() listaHistorias: any;

  otrosDatos: string[] = [];
  tieneHistoria = false;
  historiaAux = new Historia(
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  );
  verInputs = 0;
  @Output() historia = new EventEmitter<boolean>();

  constructor(
    private readonly fb: FormBuilder,
    private st: StorageService,
    private finT: FinalizarTurnoService
  ) {}

  ngOnInit() {
    this.verInputs = 0;
    this.getTieneHistoria();
    // console.log(this.historiaAux);
    console.log(this.historiaAux.datoDosClave);
    console.log(this.historiaAux);
    this.form = this.fb.group({
      // altura: ['', [Validators.min(50), Validators.max(220)]],
      altura: [
        this.historiaAux.altura,
        [Validators.min(50), Validators.max(220)],
      ],
      peso: [this.historiaAux.peso, [Validators.min(1), Validators.max(220)]],
      temperatura: [
        this.historiaAux.temperatura,
        [Validators.min(34), Validators.max(45)],
      ],
      presion: [
        this.historiaAux.presion,
        [Validators.min(2), Validators.max(30)],
      ],
      datoUnoClave: [this.historiaAux.datoUnoClave],
      datoUnoValor: [this.historiaAux.datoUnoValor],
      datoDosClave: [this.historiaAux.datoDosClave],
      datoDosValor: [this.historiaAux.datoDosValor],
      datoTresClave: [this.historiaAux.datoTresClave],
      datoTresValor: [this.historiaAux.datoTresValor],
    });
  }

  getValue(value: string): AbstractControl {
    return this.form.get(value) as FormGroup;
  }

  reset() {
    this.ngOnInit();
  }

  getTieneHistoria() {
    for (let h of this.listaHistorias) {
      if (h.pacEmail == this.turno.pacEmail) {
        this.historiaAux = h;
        this.tieneHistoria = true;
        break;
      }
    }
  }

  generarOtrosDatos() {
    this.otrosDatos = [];
    let datoUno =
      this.form.value.datoUnoClave + '$$' + this.form.value.datoUnoValor;
    let datoDos =
      this.form.value.datoDosClave + '$$' + this.form.value.datoDosValor;
    let datoTres =
      this.form.value.datoTresClave + '$$' + this.form.value.datoTresValor;
    this.otrosDatos = [datoUno, datoDos, datoTres];
  }

  setVerInputs(valor: any) {
    switch (valor) {
      case 2:
        this.verInputs = 2;
        break;
      case 3:
        this.verInputs = 3;
        break;
    }
  }

  crearHistoria() {
    console.log(this.form.value.altura);
    this.generarOtrosDatos();
    var historia = new Historia(
      this.turno.pacNombre,
      this.turno.pacApellido,
      this.turno.pacEmail,
      this.turno.pacDni,
      this.form.value.altura,
      this.form.value.peso,
      this.form.value.temperatura,
      this.form.value.presion,
      this.form.value.datoUnoClave,
      this.form.value.datoUnoValor,
      this.form.value.datoDosClave,
      this.form.value.datoDosValor,
      this.form.value.datoTresClave,
      this.form.value.datoTresValor
    );

    // console.log(historia);
    this.tieneHistoria
      ? this.st.modificarHistoria(historia).then(() => {
          this.finT.finalizarTurno(this.turno);
          this.historia.emit(false);
        })
      : this.st.addHistoria(historia).then(() => {
          this.finT.finalizarTurno(this.turno);
          this.historia.emit(false);
        });
  }

  volver() {
    this.historia.emit(false);
  }
}
