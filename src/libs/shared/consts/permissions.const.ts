import { Subject, Action } from 'src/libs/shared';

export class AppPermissions {
  static readonly ADMIN = {
    action: Action.MANAGE,
    subject: Subject.ALL,
  };
  static readonly ROLES = {
    MANAGE: {
      action: Action.MANAGE,
      subject: Subject.ROLES,
    },
    DISPLAY: {
      action: Action.DISPLAY,
      subject: Subject.ROLES,
    },
  };
  static readonly GROUPS = {
    MANAGE: {
      action: Action.MANAGE,
      subject: Subject.GROUPS,
    },
    DISPLAY: {
      action: Action.DISPLAY,
      subject: Subject.GROUPS,
    },
  };
  static readonly EVENTS = {
    MANAGE: {
      action: Action.MANAGE,
      subject: Subject.EVENTS,
    },
    DISPLAY: {
      action: Action.DISPLAY,
      subject: Subject.EVENTS,
    },
  };
  static readonly ACCOUNTS = {
    MANAGE: {
      action: Action.MANAGE,
      subject: Subject.ACCOUNTS,
    },
    DISPLAY: {
      action: Action.DISPLAY,
      subject: Subject.ACCOUNTS,
    },
  };
  static readonly ANNOUNCEMENTS = {
    MANAGE: {
      action: Action.MANAGE,
      subject: Subject.ANNOUNCEMENTS,
    },
    DISPLAY: {
      action: Action.DISPLAY,
      subject: Subject.ANNOUNCEMENTS,
    },
  };
  static readonly JOIN_CODES = {
    MANAGE: {
      action: Action.MANAGE,
      subject: Subject.JOIN_CODES,
    },
    DISPLAY: {
      action: Action.DISPLAY,
      subject: Subject.JOIN_CODES,
    },
  };
  static readonly APP = {
    DISPLAY: {
      action: Action.DISPLAY,
      subject: Subject.ALL,
    },
  };
}
