import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
import { ReturnSafeUserDto } from './dto/return-safe-user.dto';
import { UserMapper } from './user.mapper';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReturnSafeUserDto> {
    const user = await this.usersService.create(createUserDto);
    return UserMapper.toResponse(user);
  }

  @Get()
  async findAll(): Promise<ReturnSafeUserDto[]> {
    const list: User[] = await this.usersService.findAll();
    return list.map((user: User) => UserMapper.toResponse(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReturnSafeUserDto> {
    const user = await this.usersService.findOne(id);
    return UserMapper.toResponse(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
