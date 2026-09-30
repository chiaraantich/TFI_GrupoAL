import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoUsuario, RolUsuario } from '../../common/enums';
import { Medico } from '../../medicos/entities/medico.entity';
import { Reserva } from '../../reservas/entities/reserva.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  documento: string;

  @Column({ type: 'text' })
  apellidos: string;

  @Column({ type: 'text' })
  nombres: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  clave: string;

  @Column({ type: 'enum', enum: EstadoUsuario, enumName: 'estados_usuarios' })
  estado: EstadoUsuario;

  @Column({ type: 'enum', enum: RolUsuario, enumName: 'roles_usuarios' })
  rol: RolUsuario;

  @OneToOne(() => Medico, (medico) => medico.usuario)
  medico: Medico;

  @OneToMany(() => Reserva, (reserva) => reserva.paciente)
  reservas: Reserva[];
}