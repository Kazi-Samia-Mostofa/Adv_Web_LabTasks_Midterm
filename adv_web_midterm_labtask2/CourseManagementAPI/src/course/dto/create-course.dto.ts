import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/, { message: 'name should not be blank' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/\S/, { message: 'code should not be blank' })
  code: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/\S/, { message: 'instructor should not be blank' })
  instructor: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(6)
  @Type(() => Number)
  credits: number;

  @IsOptional()
  @IsString()
  description?: string;
}
