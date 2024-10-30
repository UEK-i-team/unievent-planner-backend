import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MongooseModels } from '../models/index';

@Injectable()
export class UpserDefaultsService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit(): Promise<void> {
    await this.upsertDefaults();
  }

  private getCollectionNames(models: typeof MongooseModels): string[] {
    return models.map((model) => model.collection);
  }

  async upsertDefaults(): Promise<void> {
    const dbName = process.env.MONGODB_DATABASE;
    let collectionAdded = false;
    const db = this.connection.useDb(dbName, { useCache: true });

    const collections = await db.db.listCollections().toArray();
    const collectionNames = this.getCollectionNames(MongooseModels);

    for (const collectionName of collectionNames) {
      if (
        !collections.some((collection) => collection.name === collectionName)
      ) {
        await db.createCollection(collectionName);
        collectionAdded = true;
      }
    }
    if (collectionAdded) {
      // eslint-disable-next-line no-console
      Logger.debug('[UpserService] Database prepared.');
    }
  }
}
