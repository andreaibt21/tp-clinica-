import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { CancelarTurnoService } from 'src/app/services/cancelar-turno.service';
import { AceptarTurnoService } from 'src/app/services/aceptar-turno.service';
import { FinalizarTurnoService } from 'src/app/services/finalizar-turno.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.css'],
})
export class TablaTurnosComponent implements OnInit {
  @Input() listaItems: any;
  @Input() filtroEsp: any = '';
  @Input() dni: any = '';
  @Input() rol: any = '';
  @Input() campo: any = '';
  @Input() valor: any = '';
  @Output() historia = new EventEmitter<boolean>();
  @Output() turno = new EventEmitter<Turno>();

  logueado = this.auth.getAuth();

  constructor(
    public auth: AuthService,
    public st: StorageService,
    private cancT: CancelarTurnoService,
    private acepT: AceptarTurnoService,
    private finT: FinalizarTurnoService,
    private al: AlertService
  ) {}

  ngOnInit() {
    console.log(this.listaItems);


  }

  accion(tipo: string, turno: any) {
    switch (tipo) {
      case 'cancelar':
        this.cancT.cancelarTurno(turno).then((res) => {
          if (res) {
            console.log('borrado');
          }
        });
        break;
      case 'rechazar':
        this.cancT.rechazarTurno(turno).then((res: any) => {
          if (res) {
            console.log('rechazado');
          }
        });
        break;
      case 'finalizar':
        this.historia.emit(true);
        this.turno.emit(turno);
        // this.finT.finalizarTurno(turno);
        break;
      case 'aceptar':
        this.acepT.aceptarTurno(turno);
        break;
      case 'resenia':
        this.finT.verResenia(turno);
        break;
      case 'encuesta':
        this.al.lanzarAlertaExito('aquí irá la encuesta');
        break;
      case 'reseniar':
        this.finT.reseniarTurno(turno);
        break;
    }
  }
}
