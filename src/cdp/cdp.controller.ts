import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { CdpService } from './cdp.service';
import { ParametrosDto } from './dto/parametros.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('cdp')
@Controller('cdp')
export class CdpController {
  constructor(private readonly cdpService: CdpService) {}

  @Get()
  @ApiOperation({ summary: 'Consulta CDP' })
  @ApiResponse({ status: 200, description: 'Retorna un CDP.' })
  @ApiResponse({ status: 400, description: 'Error en la solicitud.' })
  @ApiQuery({
    name: 'vigencia',
    type: 'string',
    required: true,
    example: '2024',
  })
  @ApiQuery({
    name: 'numeroDisponibilidad',
    type: 'string',
    required: true,
    example: '2314',
  })
  @ApiQuery({
    name: 'unidadEjecutora',
    type: 'string',
    required: true,
    example: '01',
  })
  obtenerCDP(@Query(ValidationPipe) query: ParametrosDto) {
    return this.cdpService.obtenerCDP(
      query.vigencia,
      query.numeroDisponibilidad,
      query.unidadEjecutora,
    );
  }
}
