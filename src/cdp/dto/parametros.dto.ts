import { IsNotEmpty } from 'class-validator';

export class ParametrosDto {
  @IsNotEmpty()
  vigencia: string;

  @IsNotEmpty()
  numeroDisponibilidad: string;

  @IsNotEmpty()
  unidadEjecutora: string;
}
