import { EntityRepository, Repository } from 'typeorm';
import Holder from './holder.entity';

@EntityRepository(Holder)
export class HolderRepository extends Repository<Holder> {}
