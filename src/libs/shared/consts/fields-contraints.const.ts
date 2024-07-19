export class FieldConstraints {
  static readonly FIRST_NAME = {
    MAX_LENGTH: 50,
  };
  static readonly LAST_NAME = {
    MAX_LENGTH: 50,
  };
  static readonly USERNAME = {
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z0-9-_]+$/,
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
  static readonly EMAIL = {
    MAX_LENGTH: 120,
  };
  static readonly CONTENT = {
    PATTERN: /^[a-zA-Z0-9]{6}$/,
  };
}
