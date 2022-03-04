import { Query, Resolver } from '@nestjs/graphql';
import Holder from './holder.entity';
import { HolderService } from './holder.service';

@Resolver(() => Holder)
export class HolderResolver {
  constructor(private readonly holderService: HolderService) {}

  @Query(() => [Holder])
  async holders(): Promise<Holder[]> {
    return this.holderService.findAll();
  }
}
