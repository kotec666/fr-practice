import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(data: CreateItemDto): Promise<CreateItemDto> {
    await this.itemRepository.save(data);

    return data;
  }

  async findAll() {
    console.log('find all!');
    return await this.itemRepository.find();
  }

  async findOne(id: number) {
    return await this.itemRepository.findOneBy({ id: id });
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
