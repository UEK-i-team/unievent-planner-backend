import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { UserAccount } from 'src/models';
import { UserAccountDto } from '../dtos';
import { CreateUserAccountDto } from '../dtos/create-user-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(UserAccount.name)
    private userAccountModel: Model<UserAccount>,
  ) {}

  async create(
    createUserAccountDto: CreateUserAccountDto,
  ): Promise<UserAccountDto> {
    const createUserAccountDoc = new this.userAccountModel();

    createUserAccountDoc.email = 'exampleUsername@exampleMail.com';
    createUserAccountDoc.username = createUserAccountDto.email.split('@')[0];
    createUserAccountDoc.firstName = 'example first name';
    createUserAccountDoc.lastName = 'example last name';
    createUserAccountDoc.groups = [];
    createUserAccountDoc.role = ['example role'];
    createUserAccountDoc.createdBy = 'example user';
    createUserAccountDoc.updatedBy = 'example user';

    const result = await createUserAccountDoc.save();
    return plainToClass(UserAccountDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async createMock(): Promise<UserAccountDto> {
    const createUserAccountDoc = new this.userAccountModel();

    createUserAccountDoc.email = 'mockuser@example.com';
    createUserAccountDoc.username = 'mockuser';
    createUserAccountDoc.firstName = 'Mock';
    createUserAccountDoc.lastName = 'User';
    createUserAccountDoc.groups = [];
    createUserAccountDoc.role = ['mockrole'];
    createUserAccountDoc.createdBy = 'mockcreator';
    createUserAccountDoc.updatedBy = 'mockupdater';

    const result = await createUserAccountDoc.save();
    return plainToClass(UserAccountDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
