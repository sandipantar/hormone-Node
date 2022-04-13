import { Module } from '@nestjs/common';
import { EnrolledcourseController } from './enrolledcourse.controller';
import { EnrolledcourseService } from './enrolledcourse.service';
import { EnrolledcourseSchema } from './enrolledcourse.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name:'Enrolledcourse', 
      schema:EnrolledcourseSchema,
      collection :'enrolledcourse'
    }]), 
  ],
  controllers: [EnrolledcourseController],
  providers: [EnrolledcourseService]
})
export class EnrolledcourseModule {}
