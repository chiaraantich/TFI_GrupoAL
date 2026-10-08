import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservasService } from '../../services/reservas';
import { AuthService } from '../../services/auth.service';
import { Reserva } from '../../models/reserva.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  turnos: Reserva[] = [];
  error = '';
  mensaje = '';
  cargando = false;

  // Formulario de nueva reserva
  idMedico = 1;
  idPaciente = 2;
  fechaHora = '';

  // Formulario de valor de consulta
  idMedicoValor = 1;
  nuevoValor = 0;

  constructor(
    private reservasService: ReservasService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    this.cargando = true;
    this.reservasService.listarTodas().subscribe({
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

  reservar(): void {
    this.error = '';
    this.mensaje = '';

    if (!this.fechaHora) {
      this.error = 'Elegí fecha y hora';
      return;
    }

    this.reservasService
      .crearReserva({
        id_medico: this.idMedico,
        id_paciente: this.idPaciente,
        fecha_hora: this.fechaHora,
      })
      .subscribe({
        next: () => {
          this.mensaje = 'Turno reservado con éxito';
          this.fechaHora = '';
          this.cargarTurnos();
        },
        error: (err) => {
          this.error = err.error?.message || 'No se pudo reservar el turno';
          this.cd.detectChanges();
        },
      });
  }

  cancelar(id: number): void {
    this.error = '';
    this.reservasService.cancelar(id).subscribe({
      next: () => this.cargarTurnos(),
      error: (err) => {
        this.error = err.error?.message || 'No se pudo cancelar el turno';
        this.cd.detectChanges();
      },
    });
  }

  actualizarValorConsulta(): void {
    this.error = '';
    this.mensaje = '';

    this.http
      .patch(`/api/medicos/${this.idMedicoValor}/valor-consulta`, {
        valor_consulta: this.nuevoValor,
      })
      .subscribe({
        next: () => {
          this.mensaje = 'Valor de consulta actualizado';
          this.cd.detectChanges();
        },
        error: (err) => {
          this.error = err.error?.message || 'No se pudo actualizar el valor';
          this.cd.detectChanges();
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