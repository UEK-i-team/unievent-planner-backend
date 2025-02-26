import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { UserAccount } from 'src/models';
import { UserAccountDto } from '../dtos';
import { CreateUserAccountDto } from '../dtos/create-user-account.dto';
import { WinstonLogger } from 'src/libs/internal/winston.logger';
import { UpserDefaultsService } from 'src/upser-defaults/upser-defaults.service';

@Injectable()
export class AccountsService implements OnModuleInit {
  constructor(
    @InjectModel(UserAccount.name)
    private userAccountModel: Model<UserAccount>,
    private upserDefaultsService: UpserDefaultsService,
  ) {}

  async onModuleInit(): Promise<void> {
    if (process.env.ADD_MOCK_DATA === 'true') {
      await this.checkAndAddMockData();
    }
  }

  async create(
    createUserAccountDto: CreateUserAccountDto,
  ): Promise<UserAccountDto> {
    const createUserAccountDoc = new this.userAccountModel();
    const user: UserAccountDto =
      await this.upserDefaultsService.getSystemAccount();

    createUserAccountDoc.email = 'exampleUsername@exampleMail.com';
    createUserAccountDoc.username = createUserAccountDto.email.split('@')[0];
    createUserAccountDoc.firstName = 'example first name';
    createUserAccountDoc.lastName = 'example last name';
    createUserAccountDoc.groups = [];
    createUserAccountDoc.role = [];
    createUserAccountDoc.createdBy = user.id;
    createUserAccountDoc.updatedBy = user.id;

    const result = await createUserAccountDoc.save();
    return plainToClass(UserAccountDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async createMock(): Promise<UserAccountDto> {
    const createUserAccountDoc = new this.userAccountModel();
    const user: UserAccountDto =
      await this.upserDefaultsService.getSystemAccount();

    createUserAccountDoc.email = 'mockuser@example.com';
    createUserAccountDoc.username = 'mockuser';
    createUserAccountDoc.firstName = 'Mock';
    createUserAccountDoc.lastName = 'User';
    createUserAccountDoc.groups = [];
    createUserAccountDoc.role = [];
    createUserAccountDoc.createdBy = user.id;
    createUserAccountDoc.updatedBy = user.id;

    const result = await createUserAccountDoc.save();
    return plainToClass(UserAccountDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async checkAndAddMockData(): Promise<void> {
    try {
      const userAccountCount = await this.userAccountModel
        .countDocuments()
        .exec();
      if (userAccountCount === 1) {
        WinstonLogger.info(
          'No user accounts other than system found, adding mock data',
        );
        await this.createMock();
        WinstonLogger.info('Mock data added');
      } else {
        WinstonLogger.info(
          `Found ${userAccountCount} user accounts in the database`,
        );
      }
    } catch (error) {
      WinstonLogger.error('Error checking or adding mock data', error);
    }
  }
}
