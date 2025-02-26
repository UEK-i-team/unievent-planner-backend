import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { randomBytes } from 'crypto';
import { UserAccountDto } from '../../accounts/dtos/user-account.dto';
import { Model } from 'mongoose';
import { Group, UserAccount, JoinCode } from '../../../models';
import { JoinCodeDto } from '../dtos/join-code.dto';
import { UpserDefaultsService } from '../../../upser-defaults/upser-defaults.service';
import { CreateJoinCodeDto } from '../dtos/create-join-code.dto';

@Injectable()
export class CodesService {
  constructor(
    private readonly upserDefaultsService: UpserDefaultsService,
    @InjectModel(UserAccount.name)
    private readonly userAccountModel: Model<UserAccount>,
    @InjectModel(JoinCode.name) private readonly joinCodeModel: Model<JoinCode>,
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
  ) {}

  generateCode(length: number = 6): string {
    return randomBytes(length)
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, length);
  }

  async create(createJoinCodeDto: CreateJoinCodeDto): Promise<JoinCodeDto> {
    const createJoinCodeDoc = new this.joinCodeModel();

    const user: UserAccountDto =
      await this.upserDefaultsService.getSystemAccount();
    createJoinCodeDoc.role = createJoinCodeDto.role;
    createJoinCodeDoc.group = createJoinCodeDto.group;
    createJoinCodeDoc.status = createJoinCodeDto.status;
    createJoinCodeDoc.usesLeft = createJoinCodeDto.usesLeft;
    createJoinCodeDoc.expiresAt = createJoinCodeDto.expiresAt;
    createJoinCodeDoc.createdAt = new Date();
    createJoinCodeDoc.updatedAt = new Date();
    createJoinCodeDoc.createdBy = user.id;
    createJoinCodeDoc.code = this.generateCode();

    const result = await createJoinCodeDoc.save();
    return plainToClass(JoinCodeDto, result, {
      excludeExtraneousValues: true,
    });
  }
  async joinGroup(code: string): Promise<void> {
    const userId = '67a5b6b354893a73691119ba';

    const joinCode = await this.joinCodeModel
      .findOne({ code })
      .select('+usesLeft +uses')
      .exec();

    if (joinCode.usesLeft <= 0) {
      throw new BadRequestException(`Join code ${code} has no remaining uses`);
    }

    const updatedUsesLeft = joinCode.usesLeft - 1;
    const updatedUses = joinCode.uses + 1;

    if (updatedUsesLeft == 0) {
      throw new BadRequestException(`Join code ${code} has no remaining uses`);
    }

    const updatedJoinCode = await this.joinCodeModel
      .findByIdAndUpdate(
        joinCode._id,
        {
          $set: {
            usesLeft: updatedUsesLeft,
            uses: updatedUses,
            updatedAt: new Date(),
          },
        },
        { new: true },
      )
      .exec();

    if (!updatedJoinCode) {
      throw new NotFoundException(`Join code ${code} not found`);
    }

    const groupUpdated = await this.groupModel
      .findById(updatedJoinCode.group)
      .exec();
    if (!groupUpdated) {
      throw new NotFoundException(
        `Group with ID ${updatedJoinCode.group} not found`,
      );
    }

    const groupUpdateResult = await this.groupModel.findByIdAndUpdate(
      groupUpdated.id,
      { $addToSet: { members: userId, updatedAt: new Date() } },
      { new: true },
    );
    if (!groupUpdateResult) {
      throw new NotFoundException(
        `Group with ID ${groupUpdateResult.id} not found`,
      );
    }

    const userUpdateResult = await this.userAccountModel.findByIdAndUpdate(
      userId,
      { $addToSet: { groups: groupUpdateResult.id, updatedAt: new Date() } },
      { new: true },
    );
    if (!userUpdateResult) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }

  async removeStudentFromGroup(groupId: string, userId: string): Promise<void> {
    const groupUpdateResult = await this.groupModel.findByIdAndUpdate(
      groupId,
      { $pull: { members: userId }, $addToSet: { updatedAt: new Date() } },
      { new: true },
    );
    if (!groupUpdateResult) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    const userUpdateResult = await this.userAccountModel.findByIdAndUpdate(
      userId,
      { $pull: { groups: groupId }, $addToSet: { updatedAt: new Date() } },
      { new: true },
    );
    if (!userUpdateResult) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }
}
