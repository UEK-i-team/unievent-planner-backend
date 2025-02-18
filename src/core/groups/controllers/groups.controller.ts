import {
  Controller,
  Post,
  Body,
  Delete,
  HttpCode,
  Param,
  Get,
} from '@nestjs/common';
import { CodeService } from 'src/core/join-codes/service/code.service';
import { GroupsService } from '../service/groups.service';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { GroupDto } from '../dtos/group.dto';
import { JoinCodeDto } from 'src/core/join-codes/dtos';

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly codeService: CodeService,
  ) {}

  @Get(':id')
  async getGroup(@Param('id') id: string): Promise<GroupDto> {
    return this.groupsService.get(id);
  }

  @Get()
  async find(): Promise<GroupDto[]> {
    return this.groupsService.find();
  }
  @Post('code')
  @HttpCode(201)
  createJoinCode(@Body() createJoinCodeDto: JoinCodeDto): Promise<JoinCodeDto> {
    return this.codeService.createJoinCode(createJoinCodeDto);
  }
  @Post()
  @HttpCode(201)
  create(@Body() createGroupDto: CreateGroupDto): Promise<GroupDto> {
    return this.groupsService.createGroup(createGroupDto);
  }

  @Post('join/:code')
  joinGroup(@Param('code') code: string): Promise<void> {
    return this.codeService.joinGroup(code);
  }

  @Delete('deleteStudent')
  removeStudentFromGroup(
    @Body() userId: string,
    @Body() groupId: string,
  ): Promise<void> {
    return this.codeService.removeStudentFromGroup(groupId, userId);
  }

  @Delete(':idOrCode')
  remove(@Param('idOrCode') id: string): Promise<{ statusCode: number }> {
    return this.groupsService.remove(id);
  }
}
