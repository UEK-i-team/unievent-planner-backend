import { Injectable } from '@nestjs/common';
import { CodesService } from 'src/codes/codes.service';
import { AppRequirements } from 'src/config/app-requirements';
@Injectable()
export class GroupsService {
  constructor(private readonly codesService: CodesService) {}

  async groupExists(code: string): Promise<boolean> {
    // TODO: Add logic
    if (!AppRequirements.validateCode(code)) {
      return false;
    }
    return ;
  }

  async addStudentToGroup(groupId: string, userId: string): Promise<void> {
    console.log(` Dodaję użytkownika ${userId} do grupy ${groupId}`);
    // TODO: Add logic 
  }

  async removeStudentFromGroup(groupId: string, userId: string): Promise<void> {
    console.log(`Usuwam użytkownika ${userId} z grupy ${groupId}`);
    // TODO: Add logic 
  }
}

