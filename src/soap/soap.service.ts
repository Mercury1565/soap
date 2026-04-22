import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { parseStringPromise } from 'xml2js';
import { SyncOrderRelationPayload } from './soap.dto';

@Injectable()
export class SoapService {
  private readonly logger = new Logger(SoapService.name);

  async parseSyncOrderRelation(rawXml: string): Promise<SyncOrderRelationPayload> {
    let result: any;
    try {
      result = await parseStringPromise(rawXml, {
        explicitArray: false,
        ignoreAttrs: true,
      });
    } catch (err) {
      throw new BadRequestException(`XML parse error: ${err.message}`);
    }

    const body = result?.['soapenv:Envelope']?.['soapenv:Body'];
    const request = body?.['ns1:syncOrderRelation'];

    if (!request) {
      throw new BadRequestException('Invalid SyncOrderRelation format');
    }

    const rawExtensionInfo = request['ns1:extensionInfo'];
    const rawItems = rawExtensionInfo?.item;
    const normalizedItems = Array.isArray(rawItems)
      ? rawItems
      : rawItems
        ? [rawItems]
        : [];

    const payload: SyncOrderRelationPayload = {
      userID: request['ns1:userID'],
      spID: request['ns1:spID'],
      productID: request['ns1:productID'],
      serviceID: request['ns1:serviceID'],
      updateType: request['ns1:updateType'],
      updateTime: request['ns1:updateTime'],
      effectiveTime: request['ns1:effectiveTime'],
      expiryTime: request['ns1:expiryTime'],
      extensionInfo: { item: normalizedItems },
    };

    this.logger.log('Parsed SyncOrderRelation payload');
    this.logger.debug(JSON.stringify(payload, null, 2));

    const transactionID = payload.extensionInfo.item.find(
      (i) => i.key === 'transactionID',
    )?.value;

    if (!transactionID) {
      throw new BadRequestException('Missing transactionID in extensionInfo');
    }

    this.logger.log(`transactionID: ${transactionID}`);
    this.logger.log(`userID: ${payload.userID?.ID}`);
    this.logger.log(`productID: ${payload.productID}`);
    this.logger.log(`updateType: ${payload.updateType}`);

    return payload;
  }
}
