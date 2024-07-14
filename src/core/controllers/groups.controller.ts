import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { GroupsService } from '../services/groups.service';
import { JoinGroupDto } from 'src/core/dtos/join-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post('join')
  async joinGroup(
    @Body() joinGroupDto: JoinGroupDto
  ): Promise<{ message: string }> {
    const { userId, code } = joinGroupDto;

    try {
      return await this.groupsService.addUserToGroup(userId, code);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error during adding user to group');
    }
  }
}
