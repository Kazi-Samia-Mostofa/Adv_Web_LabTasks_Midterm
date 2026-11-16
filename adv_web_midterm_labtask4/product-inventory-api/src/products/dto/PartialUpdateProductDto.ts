import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './CreateProductDto.js';

export class PartialUpdateProductDto extends PartialType(
  CreateProductDto,
) {}