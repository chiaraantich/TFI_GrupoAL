import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservasService } from '../../services/reservas';
import { MedicosService } from '../../services/medicos';
import { Shell } from '../../components/shell/shell';
import { Reserva } from '../../models/reserva.model';
import { MedicoInfo } from '../../models/medico.model';
import { fechaLocal, sumarDias } from '../../utils/fecha';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [FormsModule, DatePipe, Shell],
  templateUrl: './paciente.html',
  styleUrl: './paciente.css',
})
export class Paciente implements OnInit {
  medicos: MedicoInfo[] = [];
  idMedico: number | null = null;

  hoy = fechaLocal();
  maxFecha = fechaLocal(sumarDias(30));
  // Arranca en mañana: si ya es tarde, "hoy" no tiene horarios libres
  fecha = fechaLocal(sumarDias(1));

  horarios: string[] = [];
  horaElegida = '';
  cargandoHorarios = false;
  confirmando = false;

  turnos: Reserva[] = [];
  cargando = false;
  error = '';
  mensaje = '';

  constructor(
    private reservasService: ReservasService,
    private medicosService: MedicosService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.medicosService.listar().subscribe({
      next: (data) => {
        this.medicos = data;
        this.idMedico = data.length ? data[0].id : null;
        this.cargarHorarios();
        this.cd.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo cargar la lista de médicos';
        this.cd.detectChanges();
      },
    });
    this.cargarTurnos();
  }

  get medicoElegido(): MedicoInfo | undefined {
    return this.medicos.find((m) => m.id === this.idMedico);
  }

  get horaFin(): string {
    const siguiente = parseInt(this.horaElegida.slice(0, 2), 10) + 1;
    return `${String(siguiente).padStart(2, '0')}:00`;
  }

  get precio(): string {
    return this.medicoElegido ? this.formatoPrecio(this.medicoElegido.valor_consulta) : '—';
  }

  formatoPrecio(valor: number): string {
    return `$ ${valor.toLocaleString('es-AR')}`;
  }

  etiqueta(estado: Reserva['estado']): string {
    const etiquetas: Record<Reserva['estado'], string> = {
      ACTIVO: 'Pendiente',
      ATENDIDO: 'Atendido',
      AUSENTE: 'Ausente',
      CANCELADO: 'Cancelado',
    };
    return etiquetas[estado];
  }

  // El paciente solo puede cancelar hasta el día anterior a la consulta
  puedeCancelar(turno: Reserva): boolean {
    return turno.estado === 'ACTIVO' && fechaLocal(new Date(turno.fecha_hora)) > fechaLocal();
  }

  cambiarMedico(id: number): void {
    this.idMedico = id;
    this.cargarHorarios();
  }

  cambiarFecha(fecha: string): void {
    this.fecha = fecha;
    this.cargarHorarios();
  }

  elegirHora(hora: string): void {
    this.horaElegida = hora;
    this.cd.detectChanges();
  }

  cargarHorarios(): void {
    this.horaElegida = '';
    this.horarios = [];
    if (!this.idMedico || !this.fecha) {
      return;
    }

    this.cargandoHorarios = true;
    this.cd.detectChanges();
    this.reservasService.disponibilidad(this.idMedico, this.fecha).subscribe({
      next: (res) => {
        this.horarios = res.horarios;
        this.cargandoHorarios = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.error = 'No se pudieron cargar los horarios';
        this.cargandoHorarios = false;
        this.cd.detectChanges();
      },
    });
  }

  cargarTurnos(): void {
    this.cargando = true;
    this.reservasService.misTurnos().subscribe({
      next: (data) => {
        this.turnos = data;
        this.cargando = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.error = 'No se pudieron cargar tus turnos';
        this.cargando = false;
        this.cd.detectChanges();
      },
    });
  }

  confirmar(): void {
    if (!this.idMedico || !this.fecha || !this.horaElegida) {
      return;
    }

    this.error = '';
    this.mensaje = '';
    this.confirmando = true;

    this.reservasService
      .crearReserva({
        id_medico: this.idMedico,
        fecha_hora: `${this.fecha}T${this.horaElegida}:00`,
      })
      .subscribe({
        next: () => {
          this.mensaje = 'Turno reservado con éxito';
          this.confirmando = false;
          this.cargarHorarios();
          this.cargarTurnos();
        },
        error: (err) => {
          this.error = err.error?.message || 'No se pudo reservar el turno';
          this.confirmando = false;
          this.cargarHorarios();
          this.cd.detectChanges();
        },
      });
  }

  cancelar(id: number): void {
    this.error = '';
    this.mensaje = '';
    this.reservasService.cancelar(id).subscribe({
      next: () => {
        this.mensaje = 'Turno cancelado';
        this.cargarTurnos();
        this.cargarHorarios();
      },
      error: (err) => {
        this.error = err.error?.message || 'No se pudo cancelar el turno';
        this.cd.detectChanges();
      },
    });
  }
}