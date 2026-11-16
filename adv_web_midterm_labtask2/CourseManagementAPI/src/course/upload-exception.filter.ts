import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  PayloadTooLargeException,
} from '@nestjs/common';
import type { ExceptionFilter } from '@nestjs/common';
import type { Response } from 'express';

// The lab requires a 400 response for files larger than 2MB.
@Catch(PayloadTooLargeException)
export class UploadExceptionFilter implements ExceptionFilter {
  catch(exception: PayloadTooLargeException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const error = new BadRequestException('File size must not exceed 2MB');
    response.status(error.getStatus()).json(error.getResponse());
  }
}
