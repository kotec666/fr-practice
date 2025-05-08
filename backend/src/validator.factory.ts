import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export enum ERRORS {
  INVALID_LENGTH = 'INVALID_LENGTH',
  INVALID_EMAIL = 'INVALID_EMAIL',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  ALREADY_USING = 'ALREADY_USING',
  MISMATCH = 'MISMATCH',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

const validatorFactory = (errors: ValidationError[]) => {
  const classValidatorErrors = {
    isLength: ERRORS.INVALID_LENGTH,
    isEmail: ERRORS.INVALID_EMAIL,
    unknown: ERRORS.UNKNOWN_ERROR,
  };

  const result = errors.map((error) => ({
    property: error.property,
    original: error.constraints,
    message: (() => {
      if (!error.constraints) {
        return [classValidatorErrors.unknown];
      }
      return Object.keys(error.constraints).map(
        (key) =>
          classValidatorErrors[key as keyof typeof classValidatorErrors] ||
          classValidatorErrors.unknown,
      );
    })(),
  }));

  return new BadRequestException(result);
};

export default validatorFactory;
