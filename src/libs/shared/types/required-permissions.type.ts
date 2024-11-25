import { Action } from '../enums/action.enum';
import { Subject } from '../enums/subject.enum';

export type RequiredPermissions = { action: Action; subject: Subject };
