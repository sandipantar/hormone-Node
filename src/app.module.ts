import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CourseModule } from './course/course.module';
import { StudentModule } from './student/student.module';
import { CrsmoduleModule } from './crsmodule/crsmodule.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb://grt-hormone:vsBl5rTop6JAxz7RTDHjxyxxJugI2WuK4SwciLBDy2XxYPMfQu886gtdLsCQRWygq1qkf0MmMSiNcAOSKilT0Q==@grt-hormone.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@grt-hormone@'
      // 'mongodb+srv://flaamant:0bknmCFEaiQH0Ulf@cluster0.bqbtm.mongodb.net/hormone_test?retryWrites=true&w=majority'
    ),
    MulterModule.register({dest: './files',}),
    CourseModule,
    StudentModule,
    CrsmoduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
