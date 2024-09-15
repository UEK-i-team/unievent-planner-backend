import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { JoinGroupDto } from 'src/core/dtos/join-group.dto';
import { GroupsService } from '../services/groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  //TODO: actually add user to group
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
