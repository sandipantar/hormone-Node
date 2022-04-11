import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './auth.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { StudentModule } from '../student/student.module';
import { AdminModule } from '../admin/admin.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    StudentModule,
    AdminModule,
    JwtModule.register({
      secret: 'thisIsNewHormone',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {
  
}
