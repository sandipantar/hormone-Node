import { Module } from '@nestjs/common';
import { CrsmoduleController } from './crsmodule.controller';
import { CrsmoduleService } from './crsmodule.service';
import { CrsmoduleSchema } from './crsmodule.model';
import { CourseModule } from '../course/course.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseService } from '../course/course.service';

@Module({
  imports: [
    CourseModule,
    MongooseModule.forFeature([{
      name:'Crsmodule', 
      schema:CrsmoduleSchema,
      collection :'crsmodule'
    }]), 
  ],
  controllers: [CrsmoduleController],
  providers: [CrsmoduleService],
  exports: [CrsmoduleService]
})
export class CrsmoduleModule {}
