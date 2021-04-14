import {
  Table,
  Column,
  Model,
  IsUUID,
  PrimaryKey,
  Unique,
  BeforeCreate,
  HasMany,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Name } from '../names/name.model';
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

  @HasMany(() => Name, 'nationalityId')
  names: Name[];

  @BeforeCreate
  static createUUID(instance: Nationality) {
    instance.id = uuidv4();
  }
}
