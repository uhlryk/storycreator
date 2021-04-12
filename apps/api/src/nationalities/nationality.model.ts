import {
  Table,
  Column,
  Model,
  IsUUID,
  PrimaryKey,
  Unique,
  BeforeCreate,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
@Table({
  timestamps: true,
})
export class Nationality extends Model<Nationality> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Unique
  @Column
  name: string;

  @BeforeCreate
  static createUUID(instance: Nationality) {
    instance.id = uuidv4();
  }
}
