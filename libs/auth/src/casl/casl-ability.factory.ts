import {
  InferSubjects,
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from '../constants';
import { keyBy } from 'lodash';
import Role from '../resources/role/role.entity';
import User from '../resources/user/user.entity';

type Subjects = InferSubjects<typeof Role | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );
    const roles = keyBy(user.roles, 'name');

    if (roles.ADMIN) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
      can(Action.Update, User, { id: user.id }).because(
        'user can only update his own record',
      );
      cannot(Action.Manage, Role);
      cannot(Action.Delete, User, { id: { $ne: user.id } });
    }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
