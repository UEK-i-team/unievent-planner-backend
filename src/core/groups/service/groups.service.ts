import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CodesService } from 'src/codes/codes.service';
import { AppRequirements } from 'src/config/app-requirements';
import { CreateGroupDto } from '../../../groups/dtos/create-group.dto';
import { randomBytes } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from 'src/models';
import { Model } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { GroupDto } from '../../../groups/dtos/group.dto';
@Injectable()
export class GroupsService {
  @InjectModel(Group.name) private readonly GroupModel: Model<Group>;

  constructor(private readonly codesService: CodesService) {}

  private generateCode(length: number = 6): string {
    return randomBytes(length)
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, length);
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<CreateGroupDto> {
    const code = this.generateCode();

    const createGroup = new this.GroupModel({
      ...createGroupDto,
      code,
    });
    return createGroup.save();
  }

  async getGroup(idOrCode: string): Promise<GroupDto | null> {
    const group = await this.GroupModel.findOne({
      $or: [{ _id: idOrCode }, { code: idOrCode }],
    })
      .lean()
      .exec();
    if (!group) {
      return null;
    }
    return plainToClass(GroupDto, group);
  }

  async find(): Promise<Group[]> {
    return this.GroupModel.find().exec();
  }

  private async groupExists(code: string): Promise<boolean> {
    const group = await this.GroupModel.findOne({
      $or: [{ leaderCode: code }, { studentCode: code }],
    }).exec();
    if (!AppRequirements.validateCode(code)) {
      return false;
    }
    return !!group;
  }

  async addStudentToGroup(groupId: string, userId: string): Promise<void> {
    const group = await this.GroupModel.findById(groupId);
    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    // Check if user is already in the group to avoid duplicates i dodaj logik
    if (!group.members.includes(userId)) {
      throw new BadRequestException(
        `User ${userId} is already a member of group ${groupId}`,
      );
    }

    group.members.push(userId);
    await group.save();
  }

  private async removeStudentFromGroup(
    groupId: string,
    userId: string,
  ): Promise<void> {
    const group = await this.GroupModel.findById(groupId).exec();
    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    if (!group.members.includes(userId)) {
      throw new BadRequestException(
        `User ${userId} is not a member of group ${groupId}`,
      );
    }

    group.members = group.members.filter((studentId) => studentId !== userId);
    await group.save();
  }

  async remove(idOrCode: string): Promise<void> {
    const group = await this.GroupModel.findOneAndDelete({
      $or: [{ _id: idOrCode }, { code: idOrCode }],
    }).exec();

    if (!group) {
      throw new NotFoundException(
        `Group with ID or code ${idOrCode} not found`,
      );
    }
  }
}
