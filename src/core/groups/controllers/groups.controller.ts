import {
  Controller,
  Post,
  Body,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
  Param,
  Get,
} from '@nestjs/common';
import { codeService } from 'src/core/join-codes/service/code.service';
import { GroupsService } from '../service/groups.service';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { GroupDto } from '../dtos/group.dto';
import { UserAccountDto } from 'src/core/accounts/dtos';
import { UserAccount } from 'src/models';

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly codeService: codeService,
  ) {}

  @Get(':idOrCode')
  async getGroup(@Param('idOrCode') idOrCode: string): Promise<GroupDto> {
    return this.groupsService.getGroup(idOrCode);
  }

  // @Get()
  // async find() {
  //   return this.groupsService.find();
  // }

  @Post()
  @HttpCode(201)
  create(@Body() createGroupDto: CreateGroupDto): Promise<CreateGroupDto> {
    return this.groupsService.createGroup(createGroupDto);
  }

  @Post('join')
  joinGroup(@Body() userAccount: UserAccountDto): Promise<void> {
    return this.codeService.joinGroup(
      '647c5917-2ed2-4e9d-85e9-ac596e0248e2',
      userAccount.id,
    );
  }

  // @Post()
  // addStudentToGroup(@Body() joinGroupDto: JoinGroupDto) {
  //   return this.groupsService.addStudentToGroup(
  //     joinGroupDto.code,
  //     joinGroupDto.userId,
  //   );
  // }

  // @Post()
  // removeStudentFromGroup(@Body() joinGroupDto: JoinGroupDto) {
  //   return this.groupsService.removeStudentFromGroup(
  //     joinGroupDto.code,
  //     joinGroupDto.userId,
  //   );
  // }

  @Delete(':idOrCode')
  remove(@Param('idOrCode') idOrCode: string): Promise<void> {
    return this.groupsService.remove(idOrCode);
  }
}
