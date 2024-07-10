import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CdpModule } from './cdp/cdp.module';

@Module({
  imports: [CdpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
