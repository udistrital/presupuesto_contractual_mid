import { IsNotEmpty } from 'class-validator';

export class ParametrosDetalleDto {
  @IsNotEmpty()
  vigencia: string;

  @IsNotEmpty()
  numeroDisponibilidad: string;

  @IsNotEmpty()
  unidadEjecutora: string;
}

export class ParametrosListaDto {
  @IsNotEmpty()
  vigencia: string;

  @IsNotEmpty()
  unidadEjecutora: string;
}
