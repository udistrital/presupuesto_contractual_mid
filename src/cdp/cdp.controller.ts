import {
  Controller,
  Get,
  HttpException,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CdpService } from './cdp.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParametrosDetalleDto, ParametrosListaDto } from './dto/parametros.dto';

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
  async obtenerCDP(@Query(ValidationPipe) query: ParametrosDetalleDto) {
    const result = await this.cdpService.obtenerCDP(
      query.vigencia,
      query.numeroDisponibilidad,
      query.unidadEjecutora,
    );

    if (!result.Success) {
      throw new HttpException(
        {
          Success: false,
          Status: result.Status,
          Message: result.Message,
        },
        result.Status,
      );
    }

    return result;
  }

  @Get('lista')
  @ApiOperation({ summary: 'Lista CDP' })
  @ApiResponse({ status: 200, description: 'Retorna una lista de CDP.' })
  @ApiResponse({ status: 400, description: 'Error en la solicitud.' })
  @ApiQuery({
    name: 'vigencia',
    type: 'string',
    required: true,
    example: '2024',
  })
  @ApiQuery({
    name: 'unidadEjecutora',
    type: 'string',
    required: true,
    example: '01',
  })
  async listaCDP(@Query(ValidationPipe) query: ParametrosListaDto) {
    const result = await this.cdpService.listaCDP(
      query.vigencia,
      query.unidadEjecutora,
    );

    if (!result.Success) {
      throw new HttpException(
        {
          Success: false,
          Status: result.Status,
          Message: result.Message,
        },
        result.Status,
      );
    }

    return result;
  }
}
