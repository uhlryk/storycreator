import { ReturnNameDto } from './dto/return-name.dto';
import { Name } from './name.model';

export class NameMapper {
  public static toResponse(name: Name): ReturnNameDto {
    return {
      id: name.id,
      name: name.name,
      gender: name.gender,
      type: name.type,
      nationalityId: name.nationalityId,
      // nationality: { name: name.nationality.name, id: name.nationality.id },
    };
  }
}
