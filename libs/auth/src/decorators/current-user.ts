import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext()?.req
      ? ctx.getContext().req?.user
      : context.switchToHttp().getRequest()?.user;
  },
);

export const CaslAbility = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext()?.req
      ? ctx.getContext().req?.user
      : context.switchToHttp().getRequest()?.user;
    if (!user) {
      throw new UnauthorizedException();
    }
    const casl = new CaslAbilityFactory();
    return casl.createForUser(user);
  },
);
