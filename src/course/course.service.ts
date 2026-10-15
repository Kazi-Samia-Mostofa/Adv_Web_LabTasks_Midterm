import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
    getAllCourses(): string {
        return 'Get All Courses';
    }

    getCourseById(id: string): string {
        return `Get Course with ID: ${id}`;
    }

    createCourse(): string {
        return 'Create Course';
    }

    updatedCourse(id: string): string {
        return `Update Course with ID: ${id}`;
    }

    patchCourse(id: string): string {
        return `Patch Course with ID: ${id}`;
    }

    deleteCourse(id: string): string {
        return `Delete Course with ID: ${id}`;
    }

}
