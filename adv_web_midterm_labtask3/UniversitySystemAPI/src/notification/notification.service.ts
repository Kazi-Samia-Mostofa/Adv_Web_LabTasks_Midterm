import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EnrollmentService as EnrollmentProvider } from '../enrollment/enrollment.service.js';
import type { EnrollmentService } from '../enrollment/enrollment.service.js';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(forwardRef(() => EnrollmentProvider))
    private readonly enrollmentService: EnrollmentService,
  ) {}

  sendNotification(studentName: string, message: string) {
    return {
      message: 'Notification sent successfully',
      student: studentName,
      notification: message,
    };
  }

  checkEnrollmentAndNotify(studentName: string, courseId: string) {
    const enrollments = this.enrollmentService.getEnrollments();
    const notification = this.sendNotification(
      studentName,
      'Enrollment checked for course ' + courseId,
    );
    return {
      message: 'Enrollment checked and notification sent',
      student: studentName,
      courseId: courseId,
      enrollments: enrollments,
      notification: notification,
    };
  }
}
