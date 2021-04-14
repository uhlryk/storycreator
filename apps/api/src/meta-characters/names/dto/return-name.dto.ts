import { Gender } from '../gender.enum';
import { NameType } from '../name-type.enum';

export class ReturnNameDto {
  id: string;
  name: string;
  type: NameType;
  gender: Gender;
  nationalityId: string;
  // nationality: { id: string; name: string };
}
