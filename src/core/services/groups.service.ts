import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CodesService } from './codes.service';

@Injectable()
export class GroupsService {
  constructor(private readonly codesService: CodesService) {}

  async groupExists(code: string): Promise<boolean> {
    const validationResult = await this.codesService.validateCode(code);
    return (
      validationResult.groupId !== null && validationResult.status === 'active'
    );
  }

  //TODO:
  async addUserToGroup(
    userId: string,
    code: string
  ): Promise<{ message: string }> {
    const validationResult = await this.codesService.validateCode(code);

    if (!validationResult.groupId) {
      throw new BadRequestException('Invalid code');
    }

    if (validationResult.status == 'expired') {
      throw new BadRequestException('Inactive code');
    }
    if (validationResult.status == 'used') {
      throw new BadRequestException('Used code');
    }

    try {
      const groupId = validationResult.groupId;
      const role = validationResult.roleId;

      console.log(
        `Dodaję użytkownika ${userId} do grupy ${groupId}, jako ${role}`
      );
      // TODO: Add logic

      return { message: 'Student został pomyślnie dodany do grupy' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Group not found');
      }
      throw new InternalServerErrorException('Error');
    }
  }

  async removeStudentFromGroup(groupId: string, userId: string): Promise<void> {
    console.log(`Usuwam użytkownika ${userId} z grupy ${groupId}`);
    // TODO: Add logic
  }
}
