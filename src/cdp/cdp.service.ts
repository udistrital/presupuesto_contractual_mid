import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { CdpDetalleDto, CdpListaDto } from './dto/cdp.dto';

interface responseDetalle {
  informacion_cdp: {
    cdp: CdpDetalleDto[];
  };
}

interface responseLista {
  cdps_vigencia: {
    cdp: CdpListaDto[];
  };
}

@Injectable()
export class CdpService {
  constructor(private configService: ConfigService) {}

  async obtenerCDP(
    vigencia: string,
    numeroDisponibilidad: string,
    unidadEjecutora: string,
  ): Promise<StandardResponse<any>> {
    try {
      const endpoint: string = this.configService.get<string>(
        'ENDP_INFO_CDP_FINANCIERA',
      );
      const url = `${endpoint}/${vigencia}/${numeroDisponibilidad}/${unidadEjecutora}`;
      const { data } = await axios.get<responseDetalle>(url);

      if (
        data.informacion_cdp == undefined ||
        data.informacion_cdp.cdp == undefined
      ) {
        return {
          Success: false,
          Status: HttpStatus.NOT_FOUND,
          Message: 'CDP no encontrado',
        };
      }

      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'CDP Encontrado',
        Data: data.informacion_cdp.cdp,
      };
    } catch (error) {
      return {
        Success: false,
        Status: error.response?.status || 500,
        Message: error.message || 'Error al consultar el CDP',
      };
    }
  }

  async listaCDP(
    vigencia: string,
    unidadEjecutora: string,
  ): Promise<StandardResponse<any>> {
    try {
      const endpoint: string = this.configService.get<string>(
        'ENDP_CONSULTA_CDP_FINANCIERA',
      );
      const url = `${endpoint}/${vigencia}/${unidadEjecutora}`;
      const { data } = await axios.get<responseLista>(url);

      if (
        data.cdps_vigencia == undefined ||
        data.cdps_vigencia.cdp == undefined
      ) {
        return {
          Success: false,
          Status: HttpStatus.NOT_FOUND,
          Message: 'No se encontraron CDPs',
        };
      }

      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Se encontraron CDPs',
        Data: data.cdps_vigencia.cdp,
      };
    } catch (error) {
      return {
        Success: false,
        Status: error.response?.status || 500,
        Message: error.message || 'Error al consultar el CDPs',
      };
    }
  }
}
