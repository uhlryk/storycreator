import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { GetSafeUserDto } from '../users/dto/get-safe-user.dto';

@Injectable()
export class PasswordStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(createAuthDto: CreateAuthDto): Promise<GetSafeUserDto> {
    const user: GetSafeUserDto = await this.authService.validateUser(
      createAuthDto,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
