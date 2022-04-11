import { Body, Controller,NotFoundException,Post,Get,Param,Patch,Delete,BadRequestException } from '@nestjs/common';
import { Admin } from './admin.model';
import { AdminService } from './admin.service';
import * as bcrypt from 'bcrypt';

@Controller('admin')
export class AdminController {
    
    constructor(private readonly adminService:AdminService) {}

    //create new admin
    @Post()
    async create(@Body() admin:Admin) {
        const saltOrRounds = 10;
        let password:string;
        if(admin.adminSplzn==='Teacher') {
            password = "Teacher";
        } else {
            password = admin.adminPswd;
            admin.adminPswd = await bcrypt.hash(password, saltOrRounds);
        }
        admin.adminStat = true;
        const newAdmin = await this.adminService.createAdmin(admin);
        if(!newAdmin) {
            throw new BadRequestException('Admin not found');
        }
        return newAdmin;
    }
    
    //get all admins
    @Get()
    async findAll() {
        const allAdmin = await this.adminService.findAllAdmin();
        if(!allAdmin) {
            throw new NotFoundException('Admin not found');
        }
        return allAdmin;        
    } 

    //get details of an admin
    @Get('/:adminEmail')
    async getUserById(@Param("adminEmail") adminEmail : string)   {
        let showAdmin:any;
        if(adminEmail=='teacher') {
            showAdmin = await this.adminService.getTeachers();
        } else {
            showAdmin = await this.adminService.findAdminByEmail(adminEmail);
        }
        
        if(!showAdmin) {
            throw new NotFoundException('Admin not found');
        }
        return showAdmin;
    }

    //get details of an Teachers
    // @Get('/teacher')
    // async getTeachers()   {
    //     const showTeachers = await this.adminService.getTeachers();
    //     if(!showTeachers) {
    //         throw new NotFoundException('Teachers not found');
    //     }
    //     return showTeachers;
    // }

    //update details of an admin
    @Patch('/:adminEmail')
    async update( @Param('adminEmail') adminEmail: string, @Body() admin: Admin) {
        const update = await this.adminService.updateAdmin(adminEmail, admin);
        return update;
    }

    //delete an admin
    @Delete('/:adminEmail')
    async delete( @Param("adminEmail") adminEmail: string) {
        await this.adminService.deleteAdmin(adminEmail);        
        return 'Deleted admin';
    }  
}
