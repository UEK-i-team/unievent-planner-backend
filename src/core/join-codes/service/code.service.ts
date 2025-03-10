import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { generateKey, randomBytes } from 'crypto';
import { UserAccountDto } from '../../accounts/dtos/user-account.dto';
import { Model } from 'mongoose';
import { Group, UserAccount, JoinCode } from '../../../models';
import { JoinCodeDto } from '../dtos/join-code.dto';
import { UpserDefaultsService } from '../../../upser-defaults/upser-defaults.service';
import { CreateJoinCodeDto } from '../dtos/create-join-code.dto';
import { generateCode } from '../../../libs/shared/consts/generate-code.const';
@Injectable()
export class CodesService {
  constructor(
    private readonly upserDefaultsService: UpserDefaultsService,
    @InjectModel(UserAccount.name)
    private readonly userAccountModel: Model<UserAccount>,
    @InjectModel(JoinCode.name) private readonly joinCodeModel: Model<JoinCode>,
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
  ) {}

  code = generateCode();

  async create(createJoinCodeDto: CreateJoinCodeDto): Promise<JoinCodeDto> {
    const createJoinCodeDoc = new this.joinCodeModel();

    const user: UserAccountDto =
      await this.upserDefaultsService.getSystemAccount();
    createJoinCodeDoc.role = createJoinCodeDto.role;
    createJoinCodeDoc.group = createJoinCodeDto.group;
    createJoinCodeDoc.usesLeft = createJoinCodeDto.usesLeft;
    createJoinCodeDoc.expiresAt = createJoinCodeDto.expiresAt;
    createJoinCodeDoc.createdAt = new Date();
    createJoinCodeDoc.updatedAt = new Date();
    createJoinCodeDoc.updatedBy = user.id;
    createJoinCodeDoc.createdBy = user.id;
    createJoinCodeDoc.code = this.code;

    const result = await createJoinCodeDoc.save();
    return plainToClass(JoinCodeDto, result, {
      excludeExtraneousValues: true,
    });
  }
  async joinGroup(code: string): Promise<void> {
    const userId = '67c06c5b5be6b86ed0222fc1';

    const joinCode = await this.joinCodeModel
      .findOne({ code })
      .select('+usesLeft +uses')
      .exec();

    if (joinCode.usesLeft <= 0) {
      throw new BadRequestException(`Join code ${code} has no remaining uses`);
    }

    const updatedUsesLeft = joinCode.usesLeft - 1;
    const updatedUses = joinCode.uses + 1;
    // let updatedStatus = joinCode.status;

    // if (updatedUsesLeft == 0) {
    //   updatedStatus = SystemStatus.INACTIVE;
    // }

    const updatedJoinCode = await this.joinCodeModel
      .findByIdAndUpdate(
        joinCode._id,
        {
          $set: {
            usesLeft: updatedUsesLeft,
            uses: updatedUses,
            updatedAt: new Date(),
            // status: updatedStatus,
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
      .populate('members')
      .exec();
    if (!groupUpdated) {
      throw new NotFoundException(
        `Group with ID ${updatedJoinCode.group} not found`,
      );
    }

    // const userIdObjectId = new Types.ObjectId(userId);

    // if (groupUpdated.members.some((userId) => userId.equals(userIdObjectId))) {
    //   throw new BadRequestException('Student is already in the group');
    // }

    const groupUpdateResult = await this.groupModel.findByIdAndUpdate(
      groupUpdated.id,
      { $addToSet: { members: userId }, $set: { updatedAt: new Date() } },
      { new: true },
    );
    if (!groupUpdateResult) {
      throw new NotFoundException(
        `Group with ID ${groupUpdateResult.id} not found`,
      );
    }

    const userUpdateResult = await this.userAccountModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: { groups: groupUpdateResult.id },
        $set: { updatedAt: new Date() },
      },
      { new: true },
    );
    if (!userUpdateResult) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }

  async removeStudentFromGroup(groupId: string, userId: string): Promise<void> {
    const groupUpdateResult = await this.groupModel.findByIdAndUpdate(
      groupId,
      { $pull: { members: userId }, $set: { updatedAt: new Date() } },
      { new: true },
    );
    if (!groupUpdateResult) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    const userUpdateResult = await this.userAccountModel.findByIdAndUpdate(
      userId,
      { $pull: { groups: groupId }, $set: { updatedAt: new Date() } },
      { new: true },
    );
    if (!userUpdateResult) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }
}
