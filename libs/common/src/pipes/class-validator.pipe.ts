import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Type,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

type NestFunc = Type<any> | undefined;

@Injectable()
export class ClassValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const message = 'Validation Failed';
      const errorsResponse = errors.reduce(
        (acc, { property, constraints }) => ({
          ...acc,
          [property]: constraints,
        }),
        { message },
      );
      throw new BadRequestException(JSON.stringify(errorsResponse));
    }
    return value;
  }

  private toValidate(metatype: NestFunc): boolean {
    const types: NestFunc[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
