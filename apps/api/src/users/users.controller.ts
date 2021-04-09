import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
import { GetSafeUserDto } from './dto/get-safe-user.dto';
import { UserMapper } from './user.mapper';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<GetSafeUserDto[]> {
    const list: User[] = await this.usersService.findAll();
    return list.map((user: User) => UserMapper.toResponse(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GetSafeUserDto> {
    const user = await this.usersService.findOne(id);
    return UserMapper.toResponse(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
