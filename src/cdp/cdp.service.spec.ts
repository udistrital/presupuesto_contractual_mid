import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CdpService } from './cdp.service';
import { CdpDetalleDto } from './dto/cdp.dto';

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
            get: jest.fn().mockReturnValue('http://mock-oati'),
          },
        },
      ],
    }).compile();

    service = module.get<CdpService>(CdpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('obtenerCDP', () => {
    const mockCdp: CdpDetalleDto = {
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

    it('should return a CDP detail list when found', async () => {
      mockedAxios.get.mockResolvedValue({
        data: { informacion_cdp: { cdp: [mockCdp] } },
      });

      const result = await service.obtenerCDP('2023', '789', '1');

      expect(result).toEqual({
        Success: true,
        Status: HttpStatus.OK,
        Message: 'CDP Encontrado',
        Data: [mockCdp],
      });
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://mock-oati/2023/789/1',
      );
    });

    it('should return "CDP No encontrado" when not found', async () => {
      mockedAxios.get.mockResolvedValue({ data: { informacion_cdp: {} } });

      const result = await service.obtenerCDP('2023', '789', '1');

      expect(result).toEqual({
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'CDP no encontrado',
      });
    });

    it('should handle general errors', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      const result = await service.obtenerCDP('2023', '789', '1');

      expect(result).toEqual({
        Success: false,
        Status: 500,
        Message: errorMessage,
      });
    });

    it('should handle Axios errors', async () => {
      const errorMessage = 'Bad Request';
      const errorResponse = {
        response: { status: HttpStatus.BAD_REQUEST },
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

  describe('listaCDP', () => {
    const mockCdps = [
      { id: '1', numero: '123' },
      { id: '2', numero: '456' },
    ];

    it('should return a list of CDPs when found', async () => {
      mockedAxios.get.mockResolvedValue({
        data: { cdps_vigencia: { cdp: mockCdps } },
      });

      const result = await service.listaCDP('2023', '01');

      expect(result).toEqual({
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Se encontraron CDPs',
        Data: mockCdps,
      });
      expect(mockedAxios.get).toHaveBeenCalledWith('http://mock-oati/2023/01');
    });

    it('should return a 404 when no CDPs are found', async () => {
      mockedAxios.get.mockResolvedValue({ data: {} });

      const result = await service.listaCDP('2023', '01');

      expect(result).toEqual({
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'No se encontraron CDPs',
      });
    });

    it('should handle errors', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      const result = await service.listaCDP('2023', '01');

      expect(result).toEqual({
        Success: false,
        Status: 500,
        Message: 'Network error',
      });
    });
  });
});
