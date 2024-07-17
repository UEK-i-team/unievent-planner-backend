export class FieldConstraints {
  // Maximum lenghts
  static readonly MAX_FIRST_NAME_LENGTH: 50;
  static readonly MAX_LAST_NAME_LENGTH: 50;
  static readonly MAX_USERNAME_LENGTH: 50;
  static readonly MAX_CODE_LENGTH: 50;
  static readonly MAX_NAME_LENGTH: 50;
  static readonly MAX_ACTION_LENGTH: 30;
  static readonly MAX_SUBJECT_LENGTH: 30;

  static readonly FIRST_NAME = {
    MAX_LENGTH: 50,
  };

  static readonly LAST_NAME = {
    MAX_LENGTH: 50,
  };

  static readonly COURSE_NAME = {
    MAX_LENGTH: 50,
  };

  static readonly DESCRIPTION = {
    MAX_LENGTH: 200,
  };

  static readonly CODE = {
    MAX_LENGTH: 50,
    PATTERN: /^[a-z0-9-]+$/,
  };
  //Patterns
  static readonly CODE_PATTERN: RegExp = /^[a-z0-9-]+$/;
}
