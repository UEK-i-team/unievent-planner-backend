export enum UserStatus {
    Active = 'active',
    Inactive = 'inactive',
  }
  
  export enum RoleStatus {
    Active = 'active',
    Inactive = 'inactive',
  }
  
  export enum GroupStatus {
    Active = 'active',
    Inactive = 'inactive',
  }
  
  export enum VerificationStatus {
    Verified = 'verified',
    Pending = 'pending',
    Rejected = 'rejected',
  }
  
  export enum EventType {
    Zajecia = 'zajęcia',
    Spotkanie = 'spotkanie',
    Egzamin = 'egzamin',
    Inne = 'inne',
  }
  
  export enum AnnouncementTargetType {
    Global = 'global',
    Users = 'users',
    Groups = 'groups',
    Roles = 'roles',
  }
  
  export const enums = {
    UserStatus,
    RoleStatus,
    GroupStatus,
    VerificationStatus,
    EventType,
    AnnouncementTargetType,
  };
  