import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetSafeUserDto } from '../users/dto/get-safe-user.dto';

@Injectable()
export class PasswordStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(name, password): Promise<GetSafeUserDto> {
    const user: GetSafeUserDto = await this.authService.validateUser(
      name,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
