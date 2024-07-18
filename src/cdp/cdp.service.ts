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
  ): Promise<StandardResponse<any>> {
    try {
      const endpoint: string = this.configService.get<string>(
        'ENDP_INFO_CDP_FINANCIERA',
      );
      const url = `${endpoint}/${vigencia}/${numeroDisponibilidad}/${unidadEjecutora}`;

      const responseRaw = await axios.get(url);
      const response: responseData = responseRaw.data;
      return {
          Success: true,
          Status: 200,
          Message: 'CDP',
          Data: response.informacion_cdp.cdp,
      }
    } catch (error) {
        return {
          Success: false,
          Status: error.response?.status || 500,
          Message: error.message || 'Error al consultar el CDP',
        };
    }
  }
}
