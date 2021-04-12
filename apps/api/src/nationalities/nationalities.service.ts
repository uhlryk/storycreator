import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateNationalityDto } from './dto/create-nationality.dto';
import { Nationality } from './nationality.model';
@Injectable()
export class NationalitiesService {
  constructor(
    @InjectModel(Nationality)
    private readonly nationalityModel: typeof Nationality,
  ) {}

  async create(
    createNationalityDto: CreateNationalityDto,
  ): Promise<Nationality> {
    const nationality = new Nationality();
    nationality.name = createNationalityDto.name;
    return nationality.save();
  }

  async findAll(): Promise<Nationality[]> {
    return this.nationalityModel.findAll();
  }

  findOne(id: string): Promise<Nationality> {
    return this.nationalityModel.findOne({
      where: {
        id,
      },
    });
  }

  findOneByName(name: string): Promise<Nationality> {
    return this.nationalityModel.findOne({
      where: {
        name,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const nationality = await this.findOne(id);
    await nationality.destroy();
  }
}
