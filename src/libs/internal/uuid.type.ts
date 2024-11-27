import mongoose, {
  SchemaType,
  Document,
  Schema,
  SchemaOptions,
  AnyObject,
} from 'mongoose';
import { validate as uuidValidate } from 'uuid';
import { Buffer } from 'buffer';

class UUIDSchemaType extends Schema.Types.UUID {
  static schemaName: 'UUID';
  static defaultOptions: Record<string, any> = {};

  constructor(key: string, options: SchemaOptions<any> = {}) {
    super(key, options, 'UUID');
  }
  // Casts UUID String to Buffer
  cast(val: string | Buffer): Buffer | Error {
    if (typeof val === 'string') {
      if (uuidValidate(val)) {
        return Buffer.from(val, 'hex');
      }
      throw new Error(`Value is not a valid UUID string: ${val}`);
    }
    if (Buffer.isBuffer(val)) {
      return val;
    }
    throw new Error(`UUID must be a string or buffer, got ${typeof val}`);
  }

  // Casts for query
  castForQuery(val: any): Buffer | Error {
    if (typeof val === 'string') {
      if (uuidValidate(val)) {
        return Buffer.from(val, 'hex');
      }
      throw new Error(`Value is not a valid UUID string: ${val}`);
    }
    if (Buffer.isBuffer(val)) {
      return val;
    }
    throw new Error(`UUID must be a string or buffer, got ${typeof val}`);
  }

  // Getter to convert Buffer to UUID string
  get(fn: Function): any {
    return fn(this.toString());
  }

  // Check if the value is a Buffer
  checkRequired(val: Buffer): boolean {
    return Buffer.isBuffer(val);
  }
}

// Add UUID to Mongoose Schema types
mongoose.Schema.Types.UUID = UUIDSchemaType;
export { UUIDSchemaType };
