import fieldError from './fieldError';
import { HttpStatus } from '@nestjs/common';

const classValidatorLikeError = (
  message: ReturnType<typeof fieldError>[],
  status: HttpStatus,
) => ({
  message,
  error: 'Bad Request',
  statusCode: status,
});

export default classValidatorLikeError;
