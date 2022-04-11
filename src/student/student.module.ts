import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentSchema } from './student.model';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from '../course/course.module';
import { CrsmoduleModule } from '../crsmodule/crsmodule.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    CourseModule,
    CrsmoduleModule,
    MailModule,
    MongooseModule.forFeature([{
      name:'Student', 
      schema:StudentSchema,
      collection :'student'
    }]), 
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService]
})
export class StudentModule {}
