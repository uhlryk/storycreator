import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserMapper } from '../users/user.mapper';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GetSafeUserDto } from '../users/dto/get-safe-user.dto';
import { GetJwtDto } from './dto/get-jwt.dto';
import { PayloadDto } from './dto/payload.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email, password): Promise<GetSafeUserDto | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        return UserMapper.toResponse(user);
      }
      return null;
    }
    return null;
  }

  login(user: GetSafeUserDto): GetJwtDto {
    const payload: PayloadDto = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
