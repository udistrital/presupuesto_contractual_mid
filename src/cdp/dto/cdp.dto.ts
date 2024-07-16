import { ApiProperty } from '@nestjs/swagger';

export class CdpDto {
  @ApiProperty()
  vigencia: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  rubro_interno: string;

  @ApiProperty()
  estado: string;

  @ApiProperty()
  justificacion: string;

  @ApiProperty()
  id_sol_cdp: string;

  @ApiProperty()
  nombre_dependencia: string;

  @ApiProperty()
  fecha_registro: string;

  @ApiProperty()
  observaciones: string;

  @ApiProperty()
  numero_disponibilidad: string;

  @ApiProperty()
  num_sol_adq: string;

  @ApiProperty()
  valor_contratacion: string;

  @ApiProperty()
  estadocdp: string;
}
