import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { CdpService } from './cdp.service';
import { ParametrosDto } from './dto/parametros.dto';

@Controller('cdp')
export class CdpController {
  constructor(private readonly cdpService: CdpService) {}

  @Get()
  findOne(@Query(ValidationPipe) query: ParametrosDto) {
    return this.cdpService.findOne(
      query.vigencia,
      query.numeroDisponibilidad,
      query.unidadEjecutora,
    );
  }
}
