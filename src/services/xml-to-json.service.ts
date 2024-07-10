import { Injectable } from '@nestjs/common';
import { parseString } from 'xml2js';

@Injectable()
export class XmlToJsonService {
  convertXmlToJson(xml: string): Promise<any> {
    return new Promise((resolve, reject) => {
      parseString(xml, { explicitArray: false }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
