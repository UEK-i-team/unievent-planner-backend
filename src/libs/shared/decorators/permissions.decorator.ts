import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { RequiredPermissions } from '../types/required-permissions.type';

export const PERMISSION_KEY = 'Permissions';
export const Permissions = (
  permissions: RequiredPermissions | RequiredPermissions[],
): CustomDecorator<string> => {
  if (permissions instanceof Array) {
    return SetMetadata(PERMISSION_KEY, permissions);
  } else {
    return SetMetadata(PERMISSION_KEY, [permissions]);
  }
};
