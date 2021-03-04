import { ResponseUserDto } from './dto/response-user.dto';
import { User } from './user.model';

export class UserMapper {
  public static toResponse(user: User): ResponseUserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
