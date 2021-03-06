import { GetSafeUserDto } from './dto/get-safe-user.dto';
import { User } from './user.model';

export class UserMapper {
  public static toResponse(user: User): GetSafeUserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
