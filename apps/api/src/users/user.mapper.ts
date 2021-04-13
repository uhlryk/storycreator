import { GetSafeUserDto } from './dto/return-safe-user.dto';
import { User } from './user.model';

export class UserMapper {
  public static toResponse(user: User): GetSafeUserDto {
    return {
      id: user.id,
      name: user.name,
    };
  }
}
