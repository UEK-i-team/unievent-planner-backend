import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { JoinGroupDto } from 'src/core/dtos/join-group.dto';
@Injectable()
export class CodesService {
  private codeToGroupId = {
    sCode123: 'group1',
    ucode456: 'group2',
    acode789: 'group3',
  }; // TODO zamienić na faktyczną bazę danych

  //TODO: tutaj powinniśmy zwrócić dto grupy, jeżeli znaleźliśmy takową lub rzucić exception
  //TODO: oczywiście logika bedize do poprawy na właściwe wyszukanie w bazie danych jak je dodamy
  //TODO: trzeba sprawdzić czy kod istnieje w kolekcji kodów, czy nei jest przeterminowany oraz czy ma jeszcze ilosc użyć > 0 no i czy jest w statusie aktywny
  async validateCode(code: string): Promise<{
    groupId: string | null;
    roleId: string | null;
    status: string;
  }> {
    if (!this.isValidCode(code)) {
      return { groupId: null, roleId: null, status: 'invalid' };
    }

    const roleId = this.extractRole(code);
    const groupId = this.codeToGroupId[code] || null;
    const status = this.getCodeStatus(code);
    return { groupId, roleId, status };
  }

  private extractRole(code: string): string | null {
    const roleMap = {
      s: 'starosta',
      u: 'student',
      a: 'administrator',
    };
    const rolePrefix = code[0];
    return roleMap[rolePrefix] || null;
  }

  private getCodeStatus(code: string): string {
    // TODO: Replace this logic with actual status checking logic
    const statusMap = {
      sCode123: 'active',
      ucode456: 'used',
      acode789: 'expired',
    };
    return statusMap[code] || 'expired';
  }

  private async isValidCode(code: string): Promise<boolean> {
    const validateCodeDto = new JoinGroupDto();
    validateCodeDto.code = code;

    const errors = await validate(validateCodeDto);
    return errors.length === 0;
  }
}
//musi zwracac id grupy i id roli jaka kod nadaje, a jak nie to falsz, moze byc uzyty, moze wygasc
