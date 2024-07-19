import { Announcement, AnnouncementTarget } from './announcement.model';
import { Event } from './event.model';
import { Group } from './group.model';
import { JoinCode } from './join-code.model';
import { Role, AppPermissions } from './role.model';
import { UserAccount } from './user-account.model';

export * from './announcement.model';
export * from './basic.model';
export * from './event.model';
export * from './group.model';
export * from './join-code.model';
export * from './role.model';
export * from './user-account.model';

export const MongooseModels = [
  {
    name: Announcement.name,
    schema: Announcement,
    collection: 'announcements',
  },
  {
    name: AnnouncementTarget.name,
    schema: AnnouncementTarget,
    collection: 'announcementTargets',
  },
  {
    name: AppPermissions.name,
    schema: AppPermissions,
  },
  {
    name: Event.name,
    schema: Event,
    collection: 'events',
  },
  {
    name: Group.name,
    schema: Group,
    collection: 'groups',
  },
  {
    name: JoinCode.name,
    schema: JoinCode,
    collection: 'joinCodes',
  },
  {
    name: Role.name,
    schema: Role,
    collection: 'roles',
  },
  {
    name: UserAccount.name,
    schema: UserAccount,
    collection: 'userAccounts',
  },
];
