import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CodesService } from 'src/codes/codes.service';
import { AppRequirements } from 'src/config/app-requirements';
import { CreateGroupDto } from './dtos/create-group.dto';
import { randomBytes } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from 'src/models';
import { Model } from 'mongoose';
@Injectable()
export class GroupsService {
  @InjectModel(Group.name) private readonly groupModel: Model<Group>;

  constructor(private readonly codesService: CodesService) {}

  private generateCode(length: number = 6): string {
    return randomBytes(length)
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, length);
  }

  async createGroup(createGroupDto: CreateGroupDto) {
    const leaderCode = this.generateCode();
    const studentCode = this.generateCode();

    const createGroup = new this.groupModel({
      ...createGroupDto,
      leaderCode,
      studentCode,
    });
    return createGroup.save();
  }

  async getGroup(@Param('idOrCode') idOrCode: string) {
    const group = await this.groupModel.findOne({
      $or: [
        { _id: idOrCode },
        { leaderCode: idOrCode },
        { studentCode: idOrCode },
      ],
    });
    if (!group) {
      throw new NotFoundException(
        `Group with ID or code ${idOrCode} not found`,
      );
    }
    return group;
  }

  async getGroups(): Promise<Group[]> {
    return this.groupModel.find().exec();
  }

  async groupExists(code: string): Promise<boolean> {
    const group = await this.groupModel.findOne({
      $or: [{ leaderCode: code }, { studentCode: code }],
    });
    if (!AppRequirements.validateCode(code)) {
      return false;
    }
    return !!group;
  }

  async addStudentToGroup(groupId: string, userId: string): Promise<void> {
    console.log(` Dodaję użytkownika ${userId} do grupy ${groupId}`);
    const group = await this.groupModel.findById(groupId);
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

  async removeStudentFromGroup(groupId: string, userId: string): Promise<void> {
    console.log(`Usuwam użytkownika ${userId} z grupy ${groupId}`);
    const group = await this.groupModel.findById(groupId);
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

  async removeGroup(@Param('idOrCode') idOrCode: string) {
    const group = await this.groupModel.findOneAndDelete({
      $or: [{ _id: idOrCode }, { code: idOrCode }, { studentCode: idOrCode }],
    });

    if (!group) {
      throw new NotFoundException(
        `Group with ID or code ${idOrCode} not found`,
      );
    }
  }
}
