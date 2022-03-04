import { Injectable } from '@nestjs/common';
import Holder from './holder.entity';
import { HolderRepository } from './holder.repository';

@Injectable()
export class HolderService {
  constructor(private holderRepository: HolderRepository) {}

  async findAll(options = {}): Promise<Holder[]> {
    return this.holderRepository.find(options);
  }

  async findOne(options = {}): Promise<Holder> {
    return this.holderRepository.findOne(options);
  }

  async create(holder: Holder): Promise<Holder> {
    const createdHolder = await this.holderRepository.create(holder);
    const result = await this.holderRepository.save(createdHolder);
    return result;
  }

  async update(holder: Holder): Promise<Holder> {
    return await this.holderRepository.save(holder);
  }

  async delete(id: number, softDelete = false): Promise<number> {
    if (!softDelete) {
      const { affected } = await this.holderRepository.delete({ id });
      return affected;
    }
  }
}
