import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
    let appService: AppService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AppService],
        }).compile();

        appService = module.get<AppService>(AppService);
    });

    it('Debe estar definido', () => {
        expect(appService).toBeDefined();
    });

    describe('getHello', () => {
        it('Debe retornar el objeto correcto', () => {
            const result1 = appService.getHello();
            expect(result1).toEqual({ status: 'ok', checkCount: 0 });

            const result2 = appService.getHello();
            expect(result2).toEqual({ status: 'ok', checkCount: 1 });

            const result3 = appService.getHello();
            expect(result3).toEqual({ status: 'ok', checkCount: 2 });
        });

        it('Debe retornar el objeto error', () => {

            Object.defineProperty(appService, 'counter', {
                get: () => {
                    throw new Error('Test error');
                }
            });

            const result = appService.getHello();
            expect(result).toEqual({ status: 'error', error: 'Test error' });
        });
    });
});
