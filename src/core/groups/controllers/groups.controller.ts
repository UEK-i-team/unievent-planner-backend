import {
  Controller,
  Post,
  Body,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
  Param,
} from '@nestjs/common';
import { GroupsService } from '../service/groups.service';
import { JoinGroupDto } from '../../../groups/dtos/join-group.dto';
import { CodesService } from 'src/codes/codes.service';
import { AppRequirements } from 'src/config/app-requirements';
import { CreateGroupDto } from '../../../groups/dtos/create-group.dto';

@Controller('api/v1/groups')
export class GroupsController {
  constructor(
    private readonly codesService: CodesService,
    private readonly groupsService: GroupsService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createGroupDto: CreateGroupDto): Promise<CreateGroupDto> {
    return this.groupsService.createGroup(createGroupDto);
  }

  @Delete()
  remove(@Param('idOrCode') idOrCode: string): Promise<void> {
    return;
  }

  @Get();
  find(@Param('idOrCode') idOrCode: string): Promise<void> {
    return
  }

  @Post('join')
  joinGroup(@Body() joinGroupDto: JoinGroupDto) {}
  //   const { userId, code } = joinGroupDto;
  //   if (!AppRequirements.validateCode(code)) {
  //     throw new HttpException('Nieprawidłowy kod', HttpStatus.BAD_REQUEST);
  //   }

  //   try {
  //     const groupId = await this.codesService.validateCode(code);

  //     if (groupId) {
  //       await this.groupsService.addStudentToGroup(groupId, userId);
  //       return { message: 'Student został pomyślnie dodany do grupy' };
  //     } else {
  //       throw new HttpException(
  //         'Grupa nie została znaleziona',
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }
  //   } catch (error) {
  //     throw new HttpException('Błąd', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }
}
