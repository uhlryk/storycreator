import {
  Table,
  Column,
  Model,
  IsUUID,
  PrimaryKey,
  BelongsTo,
  BeforeCreate,
  ForeignKey,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Nationality } from '../nationalities/nationality.model';
import { Gender } from './gender.enum';
import { NameType } from './name-type.enum';
@Table({
  timestamps: true,
})
export class Name extends Model<Name> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Column
  type: NameType;

  @Column
  gender: Gender;

  @ForeignKey(() => Nationality)
  @Column
  nationalityId: string;

  @BelongsTo(() => Nationality)
  nationality: Nationality;

  @BeforeCreate
  static createUUID(instance: Name) {
    instance.id = uuidv4();
  }
}
