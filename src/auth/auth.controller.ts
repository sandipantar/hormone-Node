import { Body, Controller,NotFoundException,Post, Res, BadRequestException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { StudentService } from '../student/student.service';
// import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
// import { PassThrough } from 'stream';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly adminService:AdminService,
        private readonly studentService:StudentService,
        private readonly jwtService:JwtService
    ) {}
    
    //admin login
    @Post('/adminLogin')
    // @UseInterceptors(ClassSerializerInterceptor)
    async adminLogin(
            @Body("adminEmail") adminEmail: string,
            @Body("adminPswd") adminPswd: string,
            @Res({passthrough:true}) response: Response
        ){
        const showAdmin = await this.adminService.findAdminByEmail(adminEmail);
        if(!showAdmin) {
            throw new NotFoundException('Admin not found');
        }
        if(!await bcrypt.compare(adminPswd,showAdmin.adminPswd)) {
            throw new BadRequestException('Invalid Credentials');
        }
        const jwt = await this.jwtService.signAsync({id:showAdmin.id});
        response.cookie('jwt',jwt,{httpOnly: true});
        return showAdmin;
    }

    //admin logout
    @Post('/adminLogout')
    async adminLogout(
        @Body("adminEmail") adminEmail: string,
        @Res({passthrough:true}) response: Response
    ) {
        const showAdmin = await this.adminService.findAdminByEmail(adminEmail);
        if(!showAdmin) {
            throw new NotFoundException('Admin not found');
        } else {
            response.clearCookie('jwt');
            return "Successfully Logout";
        }
    }
    
    //student login
    @Post('/std/studentLogin')
    // @UseInterceptors(ClassSerializerInterceptor)
    async studentLogin(
            @Body("studentEmail") studentEmail: string,
            @Body("studentPassword") studentPassword: string,
            @Res({passthrough:true}) response: Response
        ){
        const showStudent = await this.studentService.findStudentByEmail(studentEmail);
        if(!showStudent) {
            throw new NotFoundException('Student not found');
        }
        if(!await bcrypt.compare(studentPassword,showStudent.studentPassword)) {
            throw new BadRequestException('Invalid Credentials');
        }
        const jwt = await this.jwtService.signAsync({id:showStudent._id});
        response.cookie('jwt',jwt,{httpOnly: true});
        return showStudent;
    }

    //student logout
    @Post('/std/studentLogout')
    async studentLogout(
        @Body("studentEmail") studentEmail: string,
        @Res({passthrough:true}) response: Response
    ) {
        const showStudent = await this.studentService.findStudentByEmail(studentEmail);
        if(!showStudent) {
            throw new NotFoundException('Student not found');
        } else {
            response.clearCookie('jwt');
            return "Successfully Logout";
        }
    }

}
