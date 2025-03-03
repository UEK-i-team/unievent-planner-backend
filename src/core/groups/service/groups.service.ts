import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from '../../../models';
import { Model, Types } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { GroupDto } from '../dtos/group.dto';
import { UserAccountDto } from '../../accounts/dtos/user-account.dto';
import { UpserDefaultsService } from '../../../upser-defaults/upser-defaults.service';
import { CodesService } from '../../../core/join-codes/service/code.service';
import { CreateJoinCodeDto } from '../../../core/join-codes/dtos/create-join-code.dto';
import { SystemStatus } from '../../../libs';
import { RoleDto } from '../../roles/dtos/role.dto';
@Injectable()
export class GroupsService {
  constructor(
    private readonly upserDefaultsService: UpserDefaultsService,
    private readonly codeService: CodesService,
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
  ) {}

  private toObjectId(id: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ObjectId: ${id}`);
    }
    return new Types.ObjectId(id);
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<GroupDto> {
    const createGroupDoc = new this.groupModel();

    const user: UserAccountDto =
      await this.upserDefaultsService.getSystemAccount();
    createGroupDoc.president = user.id;
    createGroupDoc.updatedAt = new Date();
    createGroupDoc.createdAt = new Date();
    createGroupDoc.updatedBy = user.id;
    createGroupDoc.createdBy = user.id;
    createGroupDoc.name = createGroupDto.name;
    createGroupDoc.courseName = createGroupDto.courseName;
    createGroupDoc.description = createGroupDto.description;
    createGroupDoc.avatarUrl = createGroupDto.avatarUrl;

    const result = await createGroupDoc.save();

    const groupSaved = plainToClass(GroupDto, result, {
      excludeExtraneousValues: true,
    });

    const temporaryRole: RoleDto = {
      id: '67a084ce81514c83dee6e2a4', // Fake ID for a temporary role
      name: 'Temporary Member',
      permissions: [], // Empty array or define permissions
      status: SystemStatus.ACTIVE,
      updatedAt: new Date(),
      createdAt: new Date(),
      updatedBy: user,
      createdBy: user,
    };

    const joinCodeDto: CreateJoinCodeDto = {
      role: temporaryRole.id, // Define the role (adjust as needed)
      group: groupSaved.id,
      status: SystemStatus.ACTIVE,
      usesLeft: 1,
      code: this.codeService.generateCode(),
    };
    const joinCode = await this.codeService.create(joinCodeDto);

    result.joinCodes = joinCode.id;
    await result.save();

    return plainToClass(GroupDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async get(id: string): Promise<GroupDto> {
    const group = await this.groupModel
      .findById(id)
      .populate('members')
      .populate('joinCodes')
      .lean()
      .exec();
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return plainToClass(GroupDto, group, {
      excludeExtraneousValues: true,
    });
  }

  async find(): Promise<GroupDto[]> {
    const groups = await this.groupModel
      .find()
      .populate('members')
      .populate('joinCodes')
      .lean()
      .exec();
    return groups.map((currentElement) =>
      plainToClass(GroupDto, currentElement, {
        excludeExtraneousValues: true,
      }),
    );
  }

  private async groupExists(id: string): Promise<boolean> {
    const group = await this.groupModel.findById(id).lean().exec();
    if (!id) {
      return false;
    }
    return !!group;
  }

  async remove(id: string): Promise<void> {
    const objectId = this.toObjectId(id);
    const group = await this.groupModel.findOneAndDelete(objectId).exec();

    if (!group) {
      throw new NotFoundException(`Group with ID or code ${id} not found`);
    }
    throw { statusCode: HttpStatus.NO_CONTENT };
  }
}
