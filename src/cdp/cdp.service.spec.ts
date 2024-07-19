import axios from 'axios';
import { CdpService } from './cdp.service';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CdpDto } from './dto/cdp.dto';
import { HttpStatus } from '@nestjs/common';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CdpService', () => {
  let service: CdpService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CdpService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('http://mock-endpoint'),
          },
        },
      ],
    }).compile();

    service = module.get<CdpService>(CdpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('deberia estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('obtenerCDP', () => {
    it('deberia retornar una lista de CDP', async () => {
      const mockCdp: CdpDto = {
        vigencia: '2023',
        descripcion: 'Test CDP',
        rubro_interno: '123',
        estado: 'Activo',
        justificacion: 'Test justification',
        id_sol_cdp: '456',
        nombre_dependencia: 'Test Dept',
        fecha_registro: '2023-01-01',
        observaciones: 'Test observations',
        numero_disponibilidad: '789',
        num_sol_adq: '101112',
        valor_contratacion: '1000000',
        estadocdp: 'Aprobado',
      };

      mockedAxios.get.mockResolvedValue({
        data: {
          informacion_cdp: {
            cdp: [mockCdp],
          },
        },
      });

      const result = await service.obtenerCDP('2023', '789', '1');

      expect(result).toEqual({
        Success: true,
        Status: HttpStatus.OK,
        Message: 'CDP Encontrado',
        Data: [mockCdp],
      });
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://mock-endpoint/2023/789/1',
      );
    });

    it('deberia retornar CDP No encontrado', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          informacion_cdp: {},
        },
      });

      const result = await service.obtenerCDP('2023', '789', '1');

      expect(result).toEqual({
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'CDP no encontrado',
      });
    });

    it('deberia retornar un error', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      const result = await service.obtenerCDP('2023', '789', '1');

      expect(result).toEqual({
        Success: false,
        Status: 500,
        Message: errorMessage,
      });
    });

    it('deberia retornar un eror de axios', async () => {
      const errorMessage = 'Bad Request';
      const errorResponse = {
        response: {
          status: HttpStatus.BAD_REQUEST,
        },
        message: errorMessage,
      };
      mockedAxios.get.mockRejectedValue({
        ...new Error(errorMessage),
        ...errorResponse,
      });

      const result = await service.obtenerCDP('2023', '789', '1');

      expect(result).toEqual({
        Success: false,
        Status: HttpStatus.BAD_REQUEST,
        Message: errorMessage,
      });
    });
  });
});
