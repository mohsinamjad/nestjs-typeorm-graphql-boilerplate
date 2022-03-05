import { Injectable } from '@nestjs/common';
import Contract from './contract.entity';
import { ContractRepository } from './contract.repository';

@Injectable()
export class ContractService {
  constructor(private contractRepository: ContractRepository) {}

  async findAll(options = {}): Promise<Contract[]> {
    return this.contractRepository.find(options);
  }

  async findOne(options = {}): Promise<Contract> {
    return this.contractRepository.findOne(options);
  }

  async create(contract: Contract): Promise<Contract> {
    const createdContract = await this.contractRepository.create(contract);
    const result = await this.contractRepository.save(createdContract);
    return result;
  }

  async update(contract: Contract): Promise<Contract> {
    return await this.contractRepository.save(contract);
  }

  async delete(id: number, softDelete = false): Promise<number> {
    if (!softDelete) {
      const { affected } = await this.contractRepository.delete({ id });
      return affected;
    }
  }
}
