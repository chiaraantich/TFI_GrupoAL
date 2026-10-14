import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservasService } from '../../services/reservas';
import { MedicosService } from '../../services/medicos';
import { UsuariosService } from '../../services/usuarios';
import { Shell, SeccionMenu } from '../../components/shell/shell';
import { Reserva } from '../../models/reserva.model';
import { MedicoInfo } from '../../models/medico.model';
import { PacienteInfo } from '../../models/paciente.model';
import { fechaLocal, sumarDias } from '../../utils/fecha';
import { etiquetaEstado, formatoPrecio } from '../../utils/formato';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, DatePipe, Shell],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  readonly etiqueta = etiquetaEstado;
  readonly formatoPrecio = formatoPrecio;

  // Secciones del menú lateral
  readonly secciones: SeccionMenu[] = [
    { id: 'reservar', etiqueta: 'Reservar turno' },
    { id: 'turnos', etiqueta: 'Todos los turnos' },
    { id: 'valores', etiqueta: 'Valores de consulta' },
  ];

  readonly encabezados: Record<string, { titulo: string; subtitulo: string }> = {
    reservar: {
      titulo: 'Reservar turno',
      subtitulo:
        'Reservá un turno a nombre de un paciente · hasta 30 días de anticipación · consultas de 1 hora, de 8 a 16 hs',
    },
    turnos: {
      titulo: 'Todos los turnos',
      subtitulo: 'Listá los turnos de cualquier médico y cancelalos hasta que inicie la consulta.',
    },
    valores: {
      titulo: 'Valor de la consulta',
      subtitulo: 'Modificá el valor por médico. Se aplica a las reservas que se hagan desde ahora.',
    },
  };

  seccion = 'reservar';

  medicos: MedicoInfo[] = [];
  pacientes: PacienteInfo[] = [];

  // Nuevo turno
  idPaciente: number | null = null;
  idMedico: number | null = null;
  hoy = fechaLocal();
  maxFecha = fechaLocal(sumarDias(30));
  fecha = fechaLocal(sumarDias(1));
  horarios: string[] = [];
  horaElegida = '';
  cargandoHorarios = false;
  confirmando = false;

  // Listado de turnos
  turnos: Reserva[] = [];
  cargando = false;
  filtroMedico = '';
  filtroFecha = '';

  // Valores de consulta
  nuevosValores: Record<number, number> = {};

  error = '';
  mensaje = '';

  constructor(
    private reservasService: ReservasService,
    private medicosService: MedicosService,
    private usuariosService: UsuariosService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();
    this.cargarPacientes();
    this.cargarTurnos();
  }

  get titulo(): string {
    return this.encabezados[this.seccion].titulo;
  }

  get subtitulo(): string {
    return this.encabezados[this.seccion].subtitulo;
  }

  get medicoElegido(): MedicoInfo | undefined {
    return this.medicos.find((m) => m.id === this.idMedico);
  }

  get pacienteElegido(): PacienteInfo | undefined {
    return this.pacientes.find((p) => p.id === this.idPaciente);
  }

  get horaFin(): string {
    const siguiente = parseInt(this.horaElegida.slice(0, 2), 10) + 1;
    return `${String(siguiente).padStart(2, '0')}:00`;
  }

  get precio(): string {
    return this.medicoElegido ? formatoPrecio(this.medicoElegido.valor_consulta) : '—';
  }

  get turnosFiltrados(): Reserva[] {
    return this.turnos.filter((t) => {
      const coincideMedico = !this.filtroMedico || t.medico_nombre === this.filtroMedico;
      const coincideFecha = !this.filtroFecha || fechaLocal(new Date(t.fecha_hora)) === this.filtroFecha;
      return coincideMedico && coincideFecha;
    });
  }

  // El admin puede cancelar hasta el momento en que inicia la consulta
  puedeCancelar(turno: Reserva): boolean {
    return turno.estado === 'ACTIVO' && new Date(turno.fecha_hora).getTime() > Date.now();
  }

  // ---------- Menú lateral ----------
  cambiarSeccion(id: string): void {
    this.seccion = id;
    this.error = '';
    this.mensaje = '';

    // Al entrar a cada sección, se refresca lo que puede haber cambiado
    if (id === 'turnos') {
      this.cargarTurnos();
    }
    if (id === 'reservar') {
      this.cargarHorarios();
    }

    this.cd.detectChanges();
  }

  // ---------- Carga de datos ----------
  cargarMedicos(): void {
    this.medicosService.listar().subscribe({
      next: (data) => {
        this.medicos = data;
        data.forEach((m) => (this.nuevosValores[m.id] = m.valor_consulta));
        if (this.idMedico === null && data.length) {
          this.idMedico = data[0].id;
          this.cargarHorarios();
        }
        this.cd.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo cargar la lista de médicos';
        this.cd.detectChanges();
      },
    });
  }

  cargarPacientes(): void {
    this.usuariosService.listarPacientes().subscribe({
      next: (data) => {
        this.pacientes = data;
        this.idPaciente = data.length ? data[0].id : null;
        this.cd.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo cargar la lista de pacientes';
        this.cd.detectChanges();
      },
    });
  }

  cargarTurnos(): void {
    this.cargando = true;
    this.cd.detectChanges();

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

  cargarHorarios(): void {
    this.horaElegida = '';
    this.horarios = [];
    if (!this.idMedico || !this.fecha) {
      this.cd.detectChanges();
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

  // ---------- Formulario de nuevo turno ----------
  cambiarPaciente(id: number): void {
    this.idPaciente = id;
    this.cd.detectChanges();
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

  confirmar(): void {
    if (!this.idPaciente || !this.idMedico || !this.fecha || !this.horaElegida) {
      return;
    }

    this.error = '';
    this.mensaje = '';
    this.confirmando = true;
    this.cd.detectChanges();

    this.reservasService
      .crearReserva({
        id_medico: this.idMedico,
        id_paciente: this.idPaciente,
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
        },
      });
  }

  // ---------- Listado ----------
  cambiarFiltroMedico(nombre: string): void {
    this.filtroMedico = nombre;
    this.cd.detectChanges();
  }

  cambiarFiltroFecha(fecha: string): void {
    this.filtroFecha = fecha;
    this.cd.detectChanges();
  }

  limpiarFiltros(): void {
    this.filtroMedico = '';
    this.filtroFecha = '';
    this.cd.detectChanges();
  }

  cancelar(id: number): void {
    this.error = '';
    this.mensaje = '';
    this.reservasService.cancelar(id).subscribe({
      next: () => {
        this.mensaje = 'Turno cancelado';
        this.cargarTurnos();
      },
      error: (err) => {
        this.error = err.error?.message || 'No se pudo cancelar el turno';
        this.cd.detectChanges();
      },
    });
  }

  // ---------- Valor de la consulta ----------
  cambiarValor(id: number, valor: number): void {
    this.nuevosValores[id] = valor;
    this.cd.detectChanges();
  }

  guardarValor(medico: MedicoInfo): void {
    this.error = '';
    this.mensaje = '';

    const valor = this.nuevosValores[medico.id];
    if (typeof valor !== 'number' || !Number.isInteger(valor) || valor < 0) {
      this.error = 'Ingresá un valor válido (número entero, sin decimales)';
      this.cd.detectChanges();
      return;
    }

    this.medicosService.actualizarValor(medico.id, valor).subscribe({
      next: () => {
        this.mensaje = `Valor de la consulta de ${medico.nombre} actualizado`;
        this.cargarMedicos();
      },
      error: (err) => {
        this.error = err.error?.message || 'No se pudo actualizar el valor';
        this.cd.detectChanges();
      },
    });
  }
}