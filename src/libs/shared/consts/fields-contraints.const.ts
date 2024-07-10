export class FieldConstraints {
  // Maximum lenghts
  static readonly MAX_FIRST_NAME_LENGTH: 50;
  static readonly MAX_LAST_NAME_LENGTH: 50;
  static readonly MAX_USERNAME_LENGTH: 50;
  static readonly MAX_CODE_LENGTH: 50;
  static readonly MAX_NAME_LENGTH: 50;
  static readonly MAX_ACTION_LENGTH: 30;
  static readonly MAX_SUBJECT_LENGTH: 30;

  //Patterns
  static readonly CODE_PATTERN: RegExp = /^[a-z0-9-]+$/;
}
