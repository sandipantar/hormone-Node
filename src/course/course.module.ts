import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseSchema } from './course.model';
import { CrsmoduleModule } from '../crsmodule/crsmodule.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name:'Course', 
      schema:CourseSchema,
      collection :'course'
    }]), 
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService]
})
export class CourseModule {}
