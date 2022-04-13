import { Body, Controller,NotFoundException,Post,Get,Param,Patch,Delete, BadRequestException } from '@nestjs/common';
import { Student } from './student.model';
import { StudentService } from './student.service';
import * as bcrypt from 'bcrypt';
import { CrsmoduleService } from '../crsmodule/crsmodule.service';
import { CourseService } from '../course/course.service';

@Controller('student')
export class StudentController {
    
    constructor(
        private readonly studentService:StudentService,
        private readonly crsmoduleSrvc:CrsmoduleService,
        private readonly courseSrv:CourseService
    ) {}

    //create new Student
    @Post()
    async createStudent(@Body() student:Student) {
        const saltOrRounds = 10;
        const nmSlug = student.studentName.replace(/ /g, '');
        const stdID = nmSlug+Math.floor(Date.now()/1000)+student.source;
        const password = student.studentPassword;
        student.studentID = stdID;
        student.studentPassword = await bcrypt.hash(password, saltOrRounds);
        student.studentPermission = false;
        const newStudent = await this.studentService.createStudent(student);
        if(!newStudent) {
            throw new BadRequestException('Student not created');
        }
        return newStudent; 
    }

    //add new course to profile
    @Post('/addCourse/:studentEmail')
    async addCourse( @Param('studentEmail') studentEmail: string, @Body("enrolledCourses") enrolledCourse: any) {
        const newCourses = await this.studentService.addCourse(studentEmail, enrolledCourse);
        return newCourses;
    }

    //send mail
    @Post('/email/:studentEmail')
    async sendMail( @Param('studentEmail') studentEmail: string ) {
        const showStd = await this.studentService.findStudentByEmail(studentEmail);
        const xcv = await this.studentService.sendMail(showStd);
        return xcv;
    }
    
    //get all Student
    @Get()
    async findAllStudent() {
        const allStudent = await this.studentService.findAllStudent();
        if(!allStudent) {
            throw new NotFoundException('Student not found');
        }
        return allStudent;        
    } 

    //get details of an student
    @Get('/:studentEmail')
    async findStudentByEmail(@Param("studentEmail") studentEmail : string)   {
        const showStd = await this.studentService.findStudentByEmail(studentEmail);
        if(!showStd) {
            throw new NotFoundException('Student not found');
        }
        return showStd;
    }
    //get details of an student
    @Get('/enrolled/single/:studentEmail/:crsSlug')
    async getSnglEnrlCrs(@Param("studentEmail") studentEmail : string,@Param("crsSlug") crsSlug : string)   {
        const showAdmin = await this.studentService.getSnglEnrlCrs(studentEmail,crsSlug);
        if(!showAdmin) {
            throw new NotFoundException('Student not found');
        }
        for(let i=0;i<showAdmin.enrolledCourses.length;i++) {
            const slctCrs = showAdmin.enrolledCourses[i];
            if(slctCrs.courseSlug==crsSlug) {
                return slctCrs;
            }
        }
        return "not found";
    }
    //get a course with all modules
    @Get('/crsWithMod/:couseSlug')
    async findCourseWithModule(@Param("couseSlug") couseSlug : string)   {
        const showCourse = await this.courseSrv.findCourseBySlug(couseSlug);
        if(!showCourse) {
            throw new NotFoundException('Course not found');
        }
        const showModule = await this.crsmoduleSrvc.findModulesOfCourse(couseSlug);
        const result = {
            _id: showCourse._id,
            couseName: showCourse.couseName,
            couseSlug: showCourse.couseSlug,
            allModule: showModule,
            noSingleModule: showCourse.noSingleModule,
            coursePrice: {
                corporatePrice:showCourse.coursePrice.corporatePrice,
                selfPrice:showCourse.coursePrice.selfPrice
            },
            couseTenure: showCourse.couseTenure
        };
        return result;
    }

    //update details of an student
    @Patch('/:studentEmail')
    async updateStudent( @Param('studentEmail') studentEmail: string, @Body('stdDetails') stdDetails: Student) {
        const update = await this.studentService.updateStudent(studentEmail, stdDetails);
        return update;
    }
    @Patch('/permission/:studentEmail')
    async updateStudentPermission( @Param('studentEmail') studentEmail: string) {
        const showStd = await this.studentService.findStudentByEmail(studentEmail);
        if(!showStd) {
            throw new NotFoundException('Student not found');
        }

        showStd.studentPermission = !showStd.studentPermission;
        const update = await this.studentService.updateStudent(studentEmail, showStd);
        return update;
    }
    //update pre exam answer
    @Patch('/examStatP/:studentEmail/:exam_couseSlug/:exam_modID')
    async updateExamStatusP( 
        @Param('studentEmail') studentEmail: string,
        @Param('exam_couseSlug') exam_couseSlug: string,
        @Param('exam_modID') exam_modID: string
    ) {
        const statPre = await this.studentService.updateExamStatusP(studentEmail,exam_couseSlug, exam_modID);
        return statPre;
    }
    //update pre exam answer
    @Patch('/examSubmit/:studentEmail/:exam_couseSlug/:exam_modID')
    async examSubmit( 
        @Param('studentEmail') studentEmail: string,
        @Param('exam_couseSlug') exam_couseSlug: string,
        @Param('exam_modID') exam_modID: string, 
        @Body("moddd") modd: any
    ) {
        const update = await this.studentService.examSubmit(studentEmail,exam_couseSlug, exam_modID,modd);
        return update;
    }

    //delete an student
    @Delete('/:studentEmail')
    async deleteStudent( @Param("studentEmail") studentEmail: string) {
        // const deletedBook = await this.studentService.deleteStudent(studentEmail);        
        // return `Deleted student with email ${studentEmail}`;
        await this.studentService.deleteStudent(studentEmail);        
        return `Deleted student with email ${studentEmail}`;
    }  

}
