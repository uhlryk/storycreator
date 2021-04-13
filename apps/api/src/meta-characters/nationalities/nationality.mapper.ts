import { NationalityDto } from './dto/nationality.dto';
import { Nationality } from './nationality.model';

export class NationalityMapper {
  public static toResponse(nationality: Nationality): NationalityDto {
    return {
      id: nationality.id,
      name: nationality.name,
    };
  }
}
