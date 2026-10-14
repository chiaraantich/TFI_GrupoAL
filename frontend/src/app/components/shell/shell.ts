import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export interface SeccionMenu {
  id: string;
  etiqueta: string;
}

@Component({
  selector: 'app-shell',
  standalone: true,
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell {
  @Input() rol = '';
  @Input() titulo = '';
  @Input() subtitulo = '';
  @Input() secciones: SeccionMenu[] = [];
  @Input() activa = '';
  @Output() seleccion = new EventEmitter<string>();

  nombre = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    const usuario = this.authService.getUsuario();
    this.nombre = usuario ? `${usuario.nombres} ${usuario.apellidos}` : '';
  }

  elegir(id: string): void {
    this.seleccion.emit(id);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}