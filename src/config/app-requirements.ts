export class AppRequirements {
    static readonly MAX_CODE_LENGTH = 20;
    static readonly CODE_PATTERN = /^[a-z0-9-]+$/;
  
    static validateCode(code: string): boolean {
      if (code.length > this.MAX_CODE_LENGTH) {
        return false;
      }
      return this.CODE_PATTERN.test(code);
    }
  }