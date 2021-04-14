import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NationalitiesService } from '../nationalities/nationalities.service';
import { Nationality } from '../nationalities/nationality.model';
import { CreateNameDto } from './dto/create-name.dto';
import { Name } from './name.model';
@Injectable()
export class NamesService {
  constructor(
    @InjectModel(Name)
    private readonly nameModel: typeof Name,
    private readonly nationalitiesService: NationalitiesService,
  ) {}

  async create(createNameDto: CreateNameDto): Promise<Name> {
    // const nationality = await this.nationalitiesService.findOne(
    //   createNameDto.nationalityId,
    // );

    const name = new Name();
    name.name = createNameDto.name;
    name.type = createNameDto.type;
    name.gender = createNameDto.gender;
    name.nationalityId = createNameDto.nationalityId;
    // name.$add('nationalitys', nationality);
    return name.save();
  }

  async findAll(): Promise<Name[]> {
    return this.nameModel.findAll();
  }

  findOne(id: string): Promise<Name> {
    return this.nameModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const name = await this.findOne(id);
    await name.destroy();
  }
}
