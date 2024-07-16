import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CdpDto } from './dto/cdp.dto';

interface responseData {
  informacion_cdp: {
    cdp: CdpDto[];
  };
}

@Injectable()
export class CdpService {

  async findOne(
    vigencia: string,
    numeroDisponibilidad: string,
    unidadEjecutora: string,
  ) {
    const url = `http://busservicios.intranetoas.udistrital.edu.co:8282/wso2eiserver/services/financiera_produccion/informacion_cdp/${vigencia}/${numeroDisponibilidad}/${unidadEjecutora}`;

    const responseRaw = await axios.get(url);
    const response: responseData = responseRaw.data;
    return response.informacion_cdp.cdp;
  }
}
