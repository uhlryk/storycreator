import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NationalitiesService } from './nationalities.service';
import { CreateNationalityDto } from './dto/create-nationality.dto';
import { NationalityDto } from './dto/nationality.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NationalityMapper } from './nationality.mapper';
import { Nationality } from './nationality.model';
@Controller('nationalities')
@UseGuards(JwtAuthGuard)
export class NationalitiesController {
  constructor(private readonly nationalitiesService: NationalitiesService) {}
  @Post()
  async create(
    @Body() createNationalityDto: CreateNationalityDto,
  ): Promise<NationalityDto> {
    const nationality: Nationality = await this.nationalitiesService.create(
      createNationalityDto,
    );
    return NationalityMapper.toResponse(nationality);
  }
  @Get()
  async findAll(): Promise<NationalityDto[]> {
    const list: Nationality[] = await this.nationalitiesService.findAll();
    return list.map((nationality: Nationality) =>
      NationalityMapper.toResponse(nationality),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<NationalityDto> {
    const nationality: Nationality = await this.nationalitiesService.findOne(
      id,
    );
    return NationalityMapper.toResponse(nationality);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.nationalitiesService.remove(id);
  }
}
