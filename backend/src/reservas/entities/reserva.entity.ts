import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoReserva } from '../../common/enums';
import { Medico } from '../../medicos/entities/medico.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Medico, (medico) => medico.reservas, { nullable: false })
  @JoinColumn({ name: 'id_medico' })
  medico: Medico;

  @ManyToOne(() => Usuario, (usuario) => usuario.reservas, { nullable: false })
  @JoinColumn({ name: 'id_paciente' })
  paciente: Usuario;

  @Column({ type: 'timestamp' })
  fecha_hora: Date;

  @Column({ type: 'enum', enum: EstadoReserva, enumName: 'estados_reservas' })
  estado: EstadoReserva;

  @Column({ type: 'int' })
  valor_consulta: number;
}