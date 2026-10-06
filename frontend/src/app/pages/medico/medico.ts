import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservasService } from '../../services/reservas';
import { AuthService } from '../../services/auth.service';
import { Reserva } from '../../models/reserva.model';

@Component({
  selector: 'app-medico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medico.html',
  styleUrl: './medico.css',
})
export class Medico implements OnInit {
  turnos: Reserva[] = [];
  fecha = new Date().toISOString().split('T')[0];
  error = '';
  cargando = false;

  constructor(
    private reservasService: ReservasService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.buscarTurnos();
  }

  buscarTurnos(): void {
    this.error = '';
    this.cargando = true;
    this.reservasService.turnosDelMedico(this.fecha).subscribe({
      next: (data) => {
        this.turnos = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los turnos';
        this.cargando = false;
      },
    });
  }

  marcar(id: number, estado: 'ATENDIDO' | 'AUSENTE'): void {
    this.reservasService.marcarEstado(id, estado).subscribe({
      next: () => this.buscarTurnos(),
      error: () => (this.error = 'No se pudo actualizar el turno'),
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}