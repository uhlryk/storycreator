import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordAuthGuard } from './password-auth.guard';
import { GetSafeUserDto } from '../users/dto/return-safe-user.dto';
import { GetJwtDto } from './dto/get-jwt.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(PasswordAuthGuard)
  @Post('/signin')
  async signin(@Req() req): Promise<GetJwtDto> {
    return this.authService.login(req.user as GetSafeUserDto);
  }

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<boolean> {
    console.log(createUserDto);
    await this.usersService.create(createUserDto);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getProfile(@Req() req) {
    return req.user;
  }
}
