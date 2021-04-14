import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NamesService } from './names.service';
import { CreateNameDto } from './dto/create-name.dto';
import { ReturnNameDto } from './dto/return-name.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { NameMapper } from './name.mapper';
import { Name } from './name.model';
@Controller('admin/names')
@UseGuards(JwtAuthGuard)
export class NamesController {
  constructor(private readonly namesService: NamesService) {}
  @Post()
  async create(@Body() createNameDto: CreateNameDto): Promise<ReturnNameDto> {
    const name: Name = await this.namesService.create(createNameDto);
    return NameMapper.toResponse(name);
  }
  @Get()
  async findAll(): Promise<ReturnNameDto[]> {
    console.log("A1");
    const list: Name[] = await this.namesService.findAll();
    console.log(list);
    return list.map((name: Name) => NameMapper.toResponse(name));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReturnNameDto> {
    const name: Name = await this.namesService.findOne(id);
    return NameMapper.toResponse(name);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.namesService.remove(id);
  }
}
