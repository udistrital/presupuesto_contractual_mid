import { Module } from '@nestjs/common';
import { CdpService } from './cdp.service';
import { CdpController } from './cdp.controller';

@Module({
  controllers: [CdpController],
  providers: [CdpService],
})
export class CdpModule {}
