import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CdpModule } from './cdp/cdp.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CdpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
