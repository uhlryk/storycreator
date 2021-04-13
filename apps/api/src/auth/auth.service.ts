import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserMapper } from '../users/user.mapper';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GetSafeUserDto } from '../users/dto/return-safe-user.dto';
import { GetJwtDto } from './dto/get-jwt.dto';
import { PayloadDto } from './dto/payload.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name, password): Promise<GetSafeUserDto | null> {
    const user = await this.usersService.findOneByName(name);

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        return UserMapper.toResponse(user);
      }
      return null;
    }
    return null;
  }

  async login(user: GetSafeUserDto): Promise<GetJwtDto> {
    const payload: PayloadDto = { name: user.name, id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
