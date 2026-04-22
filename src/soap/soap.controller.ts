import { Controller, Post, Res, Logger, Body } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SoapService } from './soap.service';

@ApiTags('data-sync')
@Controller('data-sync')
export class SoapController {
  private readonly logger = new Logger(SoapController.name);

  constructor(private readonly soapService: SoapService) {}

  @Post()
  @ApiOperation({ summary: 'Sync order relation' })
  @ApiConsumes('text/xml', 'application/xml')
  @ApiBody({ schema: { type: 'string' }, description: 'SOAP XML envelope' })
  async syncOrderRelation(@Body() xmlBody: string) {
    try {
      return await this.soapService.parseSyncOrderRelation(xmlBody);
    } catch (err) {
      this.logger.error(err.message);
     }
  }
}