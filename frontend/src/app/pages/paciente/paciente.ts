import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservasService } from '../../services/reservas';
import { AuthService } from '../../services/auth.service';
import { Reserva } from '../../models/reserva.model';


@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paciente.html',
  styleUrl: './paciente.css',
})
export class Paciente implements OnInit {
  turnos: Reserva[] = [];
  error = '';
  mensaje = '';
  cargando = false;

  // Formulario de nueva reserva
  idMedico = 1;
  fechaHora = '';

  constructor(
    private reservasService: ReservasService,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarTurnos();
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

  reservar(): void {
    this.error = '';
    this.mensaje = '';

    if (!this.fechaHora) {
      this.error = 'Elegí fecha y hora';
      return;
    }

    this.reservasService
      .crearReserva({ id_medico: this.idMedico, fecha_hora: this.fechaHora })
      .subscribe({
        next: () => {
          this.mensaje = 'Turno reservado con éxito';
          this.fechaHora = '';
          this.cargarTurnos();
        },
        error: (err) => {
          this.error = err.error?.message || 'No se pudo reservar el turno';
        },
      });
  }

  cancelar(id: number): void {
    this.error = '';
    this.reservasService.cancelar(id).subscribe({
      next: () => this.cargarTurnos(),
      error: (err) => {
        this.error = err.error?.message || 'No se pudo cancelar el turno';
      },
    });
  }

  puedeCancel(turno: Reserva): boolean {
    return turno.estado === 'ACTIVO';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}