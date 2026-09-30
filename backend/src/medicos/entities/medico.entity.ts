import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Reserva } from '../../reservas/entities/reserva.entity';

@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Usuario, (usuario) => usuario.medico, { nullable: false })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ type: 'int' })
  matricula: number;

  @Column({ type: 'int' })
  valor_consulta: number;

  @OneToMany(() => Reserva, (reserva) => reserva.medico)
  reservas: Reserva[];
}