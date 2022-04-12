import { Module } from '@nestjs/common';
import { EnrolledcourseController } from './enrolledcourse.controller';
import { EnrolledcourseService } from './enrolledcourse.service';

@Module({
  controllers: [EnrolledcourseController],
  providers: [EnrolledcourseService]
})
export class EnrolledcourseModule {}
