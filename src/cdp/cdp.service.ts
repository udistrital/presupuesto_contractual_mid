import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import axios, {AxiosError} from 'axios';
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
      const {data} = await axios.get<responseData>(url);

      if(data.informacion_cdp == undefined || data.informacion_cdp.cdp == undefined) {
        return {
            Success: false,
            Status: HttpStatus.NOT_FOUND,
            Message: 'CDP no encontrado',
        }
      }

      return {
          Success: true,
          Status: HttpStatus.OK,
          Message: 'CDP Encontrado',
          Data: data.informacion_cdp.cdp,
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
