import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(createAuthDto: CreateAuthDto): Promise<any> {
    const user = await this.usersService.findOneByEmail(createAuthDto.email);
    if (user && user.password === createAuthDto.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
