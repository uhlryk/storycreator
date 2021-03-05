import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserMapper } from '../users/user.mapper';
import { CreateAuthDto } from './dto/create-auth.dto';
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

  async validateUser(
    createAuthDto: CreateAuthDto,
  ): Promise<GetSafeUserDto | null> {
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

  login(user: GetSafeUserDto): GetJwtDto {
    const payload: PayloadDto = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
