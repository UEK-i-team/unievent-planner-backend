import { Injectable } from '@nestjs/common';

@Injectable()
export class CodesService {
  private codeToGroupId = {
    code123: 'group1',
    code456: 'group2',
  }; //  TODO zamienić na faktyczną baze danych

  //TODO: actually validate code
  async validateCode(code: string): Promise<string | null> {
    const groupId = this.codeToGroupId[code] || null;
    return groupId;
  }
}
