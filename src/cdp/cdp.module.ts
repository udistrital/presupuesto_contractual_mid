import { Module } from '@nestjs/common';
import { CdpService } from './cdp.service';
import { CdpController } from './cdp.controller';
import { XmlToJsonService } from '../services/xml-to-json.service';

@Module({
  controllers: [CdpController],
  providers: [CdpService, XmlToJsonService],
})
export class CdpModule {}
