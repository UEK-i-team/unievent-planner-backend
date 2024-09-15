export class AppRequirements {
  //TODO someone else was suppose to create this file, so when mergin actually check if it exists and it is used
  static readonly MAX_CODE_LENGTH = 20;
  static readonly CODE_PATTERN = /^[a-z0-9-]+$/;

  //TODO: code validation should be handled by the databes and/or codesService module itself
  static validateCode(code: string): boolean {
    if (code.length > this.MAX_CODE_LENGTH) {
      return false;
    }
    return this.CODE_PATTERN.test(code);
  }
}
