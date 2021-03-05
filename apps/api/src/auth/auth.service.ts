import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserMapper } from '../users/user.mapper';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(createAuthDto: CreateAuthDto): Promise<any> {
    const user = await this.usersService.findOneByEmail(createAuthDto.email);

    if (user && user.password === createAuthDto.password) {
      const isPasswordCorrect = await bcrypt.compare(
        createAuthDto.password,
        user.password,
      );
      if (isPasswordCorrect) {
        return UserMapper.toResponse(user);
      }
      return null;
    }
    return null;
  }
}
