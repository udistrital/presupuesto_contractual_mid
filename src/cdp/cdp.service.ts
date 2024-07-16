import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CdpDto } from './dto/cdp.dto';
import { ConfigService } from '@nestjs/config';

interface responseData {
  informacion_cdp: {
    cdp: CdpDto[];
  };
}

@Injectable()
export class CdpService {
  constructor(private configService: ConfigService) {}

  async findOne(
    vigencia: string,
    numeroDisponibilidad: string,
    unidadEjecutora: string,
  ) {
    const endpoint: string = this.configService.get<string>(
      'ENDP_INFO_CDP_FINANCIERA',
    );
    const url = `${endpoint}/${vigencia}/${numeroDisponibilidad}/${unidadEjecutora}`;

    const responseRaw = await axios.get(url);
    const response: responseData = responseRaw.data;
    return response.informacion_cdp.cdp;
  }
}
