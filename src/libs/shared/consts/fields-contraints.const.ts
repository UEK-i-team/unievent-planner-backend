export class FieldConstraints {
  static readonly FIRST_NAME = {
    MAX_LENGTH: 50,
  };
  static readonly LAST_NAME = {
    MAX_LENGTH: 50,
  };
  static readonly USERNAME = {
    MAX_LENGTH: 50,
  };
  static readonly CODE = {
    MAX_LENGTH: 50,
    PATTERN: /^[a-z0-9-]+$/,
  };
  static readonly NAME = {
    MAX_LENGTH: 50,
  };
  static readonly ACTION = {
    MAX_LENGTH: 30,
  };
  static readonly SUBJECT = {
    MAX_LENGTH: 30,
  };

  static readonly COURSE_NAME = {
    MAX_LENGTH: 50,
  };

  static readonly DESCRIPTION = {
    MAX_LENGTH: 200,
  };
}
