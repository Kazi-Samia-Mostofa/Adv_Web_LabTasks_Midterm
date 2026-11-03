import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faculty } from './entities/faculty.entity.js';
import { CreateFacultyDto } from './dto/create-faculty.dto.js';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectRepository(Faculty)
    private readonly facultyRepo: Repository<Faculty>,
  ) {}

  async createFaculty(dto: CreateFacultyDto): Promise<Faculty> {
    try {
      const faculty = this.facultyRepo.create({
        id: dto.Id,
        name: dto.Name,
        expertise: dto.expertise,
        noOfPublication: dto.noOfPublication,
      });
      return await this.facultyRepo.save(faculty);
    } catch {
      throw new BadRequestException('Failed to create faculty');
    }
  }
}