import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  nombre = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    const usuario = this.authService.getUsuario();
    this.nombre = usuario ? `${usuario.nombres} ${usuario.apellidos}` : '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}