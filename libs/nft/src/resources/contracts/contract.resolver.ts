import { Query, Resolver } from '@nestjs/graphql';
import Contract from './contract.entity';
import { ContractService } from './contract.service';

@Resolver(() => Contract)
export class ContractResolver {
  constructor(private readonly contractService: ContractService) {}

  @Query(() => [Contract])
  async contracts(): Promise<Contract[]> {
    return this.contractService.findAll();
  }
}
