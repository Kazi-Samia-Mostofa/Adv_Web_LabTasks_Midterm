import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CourseService } from '../course/course.service.js';
import { NotificationService as NotificationProvider } from '../notification/notification.service.js';
import type { NotificationService } from '../notification/notification.service.js';

@Injectable()
export class EnrollmentService {
  constructor(
    private readonly courseService: CourseService,
    @Inject(forwardRef(() => NotificationProvider))
    private readonly notificationService: NotificationService,
  ) {}

  enrollStudent(studentName: string, courseId: string) {
    const course = this.courseService.getCourseById(courseId);
    const notification = this.notificationService.sendNotification(
      studentName,
      'Enrollment successful for course ' + courseId,
    );
    return {
      message: 'Student enrolled successfully',
      student: studentName,
      course: course,
      notification: notification,
    };
  }

  getEnrollments() {
    return { message: 'All enrollments fetched', data: [] };
  }
}
