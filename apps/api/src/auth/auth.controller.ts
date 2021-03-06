import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordAuthGuard } from './password-auth.guard';
import { GetSafeUserDto } from '../users/dto/get-safe-user.dto';
import { GetJwtDto } from './dto/get-jwt.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(PasswordAuthGuard)
  @Post('/login')
  login(@Req() req): GetJwtDto {
    return this.authService.login(req.user as GetSafeUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getProfile(@Req() req) {
    return req.user;
  }
}
