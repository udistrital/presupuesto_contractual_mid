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
          success: true,
          status: 200,
          message: 'CDP',
          data: response.informacion_cdp.cdp,
      }
    } catch (error) {
        return {
          success: false,
          status: error.response?.status || 500,
          message: error.message || 'Error al consultar el CDP',
        };
    }
  }
}
