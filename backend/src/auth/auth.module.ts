import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      secret: config.get<string>('JWT_SECRET') ?? 'secreto_por_defecto',
      signOptions: {
        expiresIn: (config.get<string>('JWT_EXPIRES') ?? '1d') as any,
      },
    }),
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}