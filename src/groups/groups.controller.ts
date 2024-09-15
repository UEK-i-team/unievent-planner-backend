import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CodesService } from 'src/codes/codes.service';
import { AppRequirements } from 'src/config/app-requirements';
import { CreateGroupDto } from './dtos/create-group.dto';
import { GroupDto } from './dtos/group.dto';
import { JoinGroupDto } from './dtos/join-group.dto';
import { GroupsService } from './groups.service';

@Controller('api/v1/groups')
export class GroupsController {
  constructor(
    private readonly codesService: CodesService,
    private readonly groupsService: GroupsService
  ) {}

  @Post()
  createGroup(@Body() createGroupDto: CreateGroupDto): Promise<GroupDto> {
    return this.groupsService.createGroup(createGroupDto);
  }

  @Post('join')
  async joinGroup(@Body() joinGroupDto: JoinGroupDto): Promise<GroupDto> {
    const { userId, code } = joinGroupDto;
    if (!AppRequirements.validateCode(code)) {
      throw new HttpException('Nieprawidłowy kod', HttpStatus.BAD_REQUEST);
    }

    try {
      const groupId = await this.codesService.validateCode(code);

      if (groupId) {
        await this.groupsService.addStudentToGroup(groupId, userId);
        return { message: 'Student został pomyślnie dodany do grupy' };
      } else {
        // TODO: add logic later
        throw new HttpException(
          'Grupa nie została znaleziona',
          HttpStatus.NOT_FOUND
        );
      }
    } catch (error) {
      // TODO: add logic later
      throw new HttpException('Błąd', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
