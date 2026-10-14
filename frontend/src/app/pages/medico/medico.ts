import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservasService } from '../../services/reservas';
import { Shell } from '../../components/shell/shell';
import { Reserva } from '../../models/reserva.model';
import { fechaLocal } from '../../utils/fecha';
import { etiquetaEstado } from '../../utils/formato';

interface Fila {
  hora: string;
  turno?: Reserva;
}

@Component({
  selector: 'app-medico',
  standalone: true,
  imports: [FormsModule, Shell],
  templateUrl: './medico.html',
  styleUrl: './medico.css',
})
export class Medico implements OnInit {
  readonly horas = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  readonly etiqueta = etiquetaEstado;

  fecha = fechaLocal();
  turnos: Reserva[] = [];
  cargando = false;
  error = '';

  constructor(
    private reservasService: ReservasService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.buscarTurnos();
  }

  // Un turno cancelado deja el horario libre, así que no se muestra en la grilla
  get vigentes(): Reserva[] {
    return this.turnos.filter((t) => t.estado !== 'CANCELADO');
  }

  get filas(): Fila[] {
    return this.horas.map((hora) => ({
      hora,
      turno: this.vigentes.find((t) => this.horaDe(t) === hora),
    }));
  }

  get total(): number {
    return this.vigentes.length;
  }

  get atendidos(): number {
    return this.vigentes.filter((t) => t.estado === 'ATENDIDO').length;
  }

  get ausentes(): number {
    return this.vigentes.filter((t) => t.estado === 'AUSENTE').length;
  }

  get pendientes(): number {
    return this.vigentes.filter((t) => t.estado === 'ACTIVO').length;
  }

  private horaDe(turno: Reserva): string {
    return `${String(new Date(turno.fecha_hora).getHours()).padStart(2, '0')}:00`;
  }

  cambiarFecha(fecha: string): void {
    this.fecha = fecha;
    this.buscarTurnos();
  }

  buscarTurnos(): void {
    if (!this.fecha) {
      return;
    }

    this.error = '';
    this.cargando = true;
    this.cd.detectChanges();

    this.reservasService.turnosDelMedico(this.fecha).subscribe({
      next: (data) => {
        this.turnos = data;
        this.cargando = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.error = 'No se pudieron cargar los turnos';
        this.cargando = false;
        this.cd.detectChanges();
      },
    });
  }

  marcar(id: number, estado: 'ATENDIDO' | 'AUSENTE'): void {
    this.error = '';
    this.reservasService.marcarEstado(id, estado).subscribe({
      next: () => this.buscarTurnos(),
      error: (err) => {
        this.error = err.error?.message || 'No se pudo actualizar el turno';
        this.cd.detectChanges();
      },
    });
  }
}