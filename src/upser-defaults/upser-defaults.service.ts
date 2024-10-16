import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class UpserDefaultsService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit(): Promise<void> {
    await this.upsertDefaults();
  }

  async upsertDefaults(): Promise<void> {
    const dbName = 'dev';
    const db = this.connection.useDb(dbName, { useCache: true });

    const collections = await db.db.listCollections().toArray();

    if (!collections.some((collection) => collection.name === 'users')) {
      await db.createCollection('users');
    }
  }
}
